import json
import google.generativeai as genai

genai.configure(api_key="AIzaSyDObieTwAqx4f7dAuR4vKAXDcZOargmVSw")
model = genai.GenerativeModel("gemini-1.5-flash")

with open(r"C:\Users\user\Desktop\NextNews\NextNews\model\scraped_page_data.json", "r") as file:
    news_data = json.load(file)

news_content = news_data.get("content", "")

query = f"Summarize this news and present it in the style of a news anchor: {news_content}"

response = model.generate_content(query)
summary_text = response.text

output_file = "news_summary.txt"
with open(output_file, "w") as file:
    file.write("Generated News Summary:\n")
    file.write(summary_text)

print(f"News summary saved in '{output_file}'.")
