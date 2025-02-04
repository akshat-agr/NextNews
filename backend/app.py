from flask import Flask, request, render_template, redirect, url_for, jsonify
from flask_cors import CORS  # Import CORS

import json
import os
import requests
from serpapi import GoogleSearch
from bs4 import BeautifulSoup
from gtts import gTTS
import google.generativeai as genai
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)
GENAI_API_KEY = "AIzaSyDObieTwAqx4f7dAuR4vKAXDcZOargmVSw"
SERPAPI_API_KEY = "c3550daff1993dfb2163f83161c9f284d9fb12f5fe20d0a1c9451fd9f4e44608"
genai.configure(api_key=GENAI_API_KEY)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/scrape', methods=['POST'])
def scrape_news():
    try:
        # Get data from the frontend as JSON
        data = request.get_json()
        gl = data.get("gl")
        q = data.get("q")

        logger.debug(f"Scraping news for query: {q}, region: {gl}")
        
        params = {
            "engine": "google_news",
            "q": q,
            "gl": gl,
            "hl": "en",
            "api_key": SERPAPI_API_KEY
        }
        
        search = GoogleSearch(params)
        results = search.get_dict()
        news_results = results.get("news_results", [])
        
        if not news_results:
            logger.warning("No news results found")
            return jsonify({"error": "No news results found"}), 404
        
        # Log and print the results to the console
        logger.debug(f"Found {len(news_results)} news results")
        
        # Display the result in the console (or terminal)
        for result in news_results:
            logger.debug(f"Title: {result.get('title')}, Link: {result.get('link')}")

        news_file_path = "news_results.json"
        with open(news_file_path, "w", encoding='utf-8') as file:
            json.dump(news_results, file, indent=4, ensure_ascii=False)
            
        logger.debug(f"Saved news results to {news_file_path}")
        return redirect(url_for('extract_titles'))  # Redirect to next step
        
    except Exception as e:
        logger.error(f"Error in scrape_news: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/extract_titles')
def extract_titles():
    try:
        input_file_path = "news_results.json"
        output_file_path = "output.json"
        
        logger.debug(f"Reading from {input_file_path}")
        
        if not os.path.exists(input_file_path):
            logger.error(f"File not found: {input_file_path}")
            return jsonify({"error": "News results file not found"}), 404
            
        with open(input_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            
        # Limit to top 5 articles
        result = []
        count = 0
        
        # First try to get articles from main results
        for item in data:
            if count >= 5:
                break
                
            title = item.get("title")
            link = item.get("link")
            
            if title and link:
                result.append({
                    "title": title,
                    "link": link
                })
                count += 1
                logger.debug(f"Added article: {title[:50]}...")

        logger.debug(f"Extracted {len(result)} articles")
        
        with open(output_file_path, 'w', encoding='utf-8') as output_file:
            json.dump(result, output_file, indent=4, ensure_ascii=False)
            
        logger.debug(f"Saved extracted titles to {output_file_path}")
        return redirect(url_for('extract_content'))  # Redirect to next step
        
    except Exception as e:
        logger.error(f"Error in extract_titles: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/extract_content')
def extract_content():
    try:
        json_file_path = "output.json"
        output_file_path = "scraped_page_data.json"
        
        logger.debug(f"Reading from {json_file_path}")
        
        if not os.path.exists(json_file_path):
            logger.error(f"File not found: {json_file_path}")
            return jsonify({"error": "Articles file not found"}), 404
            
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # Extract content from all articles
        all_articles = []
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        for article in data:
            try:
                link = article["link"]
                logger.debug(f"Fetching content from: {link}")
                
                response = requests.get(link, headers=headers, timeout=10)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.content, "html.parser")
                
                # Remove script and style elements
                for script in soup(["script", "style"]):
                    script.decompose()
                
                # Get text and clean it
                text = soup.get_text(separator=' ', strip=True)
                # Remove extra whitespace
                text = ' '.join(text.split())
                
                all_articles.append({
                    "title": article["title"],
                    "link": link,
                    "content": text[:5000]  # Limit content length to avoid processing issues
                })
                logger.debug(f"Successfully extracted content from: {article['title'][:50]}...")

            except Exception as article_error:
                logger.error(f"Error extracting content from {link}: {str(article_error)}")
                continue
        
        if not all_articles:
            logger.error("No article content could be extracted")
            return jsonify({"error": "Failed to extract any article content"}), 500
        
        with open(output_file_path, 'w', encoding='utf-8') as output_file:
            json.dump(all_articles, output_file, indent=4, ensure_ascii=False)
            
        logger.debug(f"Saved scraped content to {output_file_path}")
        return redirect(url_for('summarize_news'))  # Redirect to next step
        
    except Exception as e:
        logger.error(f"Error in extract_content: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/summarize_news')
def summarize_news():
    try:
        input_file_path = "scraped_page_data.json"
        
        logger.debug(f"Reading from {input_file_path}")
        
        if not os.path.exists(input_file_path):
            logger.error(f"File not found: {input_file_path}")
            return jsonify({"error": "Scraped content file not found"}), 404
            
        with open(input_file_path, 'r', encoding='utf-8') as file:
            news_data = json.load(file)
        
        summaries = []
        for article in news_data:
            try:
                # Create a more focused prompt for better summaries
                prompt = f"""Please provide a concise news summary of the following article titled "{article['title']}". 
                Focus on the key facts and main points and present it like an news anchor is giving news: {article['content'][:2000]}"""
                
                logger.debug(f"Generating summary for: {article['title'][:50]}...")
                
                model = genai.GenerativeModel("gemini-1.5-flash")
                response = model.generate_content(prompt)
                
                summaries.append({
                    "title": article["title"],
                    "summary": response.text
                })
                logger.debug(f"Successfully generated summary for: {article['title'][:50]}...")
                
            except Exception as summary_error:
                logger.error(f"Error summarizing article {article['title']}: {str(summary_error)}")
                continue
        
        if not summaries:
            logger.error("No summaries could be generated")
            return jsonify({"error": "Failed to generate any summaries"}), 500
        
        with open("news_summary.txt", "w", encoding='utf-8') as file:
            for summary in summaries:
                file.write(summary['summary'])
                
        logger.debug("Saved all summaries to news_summary.txt")
        return redirect(url_for('generate_voice'))  # Redirect to next step
        
    except Exception as e:
        logger.error(f"Error in summarize_news: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/generate_voice')
def generate_voice():
    try:
        if not os.path.exists("news_summary.txt"):
            logger.error("Summary file not found")
            return jsonify({"error": "No summary available to convert to speech"}), 404
            
        with open("news_summary.txt", "r", encoding='utf-8') as file:
            text = file.read().strip()
        
        if not text:
            logger.error("Summary file is empty")
            return jsonify({"error": "The summary file is empty"}), 400
            
        logger.debug("Generating speech from summary")
        tts = gTTS(text=text[:3000], lang="en", slow=False)  # Limit text length for voice generation
        output_file = "output.mp3"
        tts.save(output_file)
        
        logger.debug(f"Successfully saved speech to {output_file}")
        return jsonify({"message": f"Speech generated and saved as {output_file}"})
        
    except Exception as e:
        logger.error(f"Error in generate_voice: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
