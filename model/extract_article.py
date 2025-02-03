import json
import requests
from bs4 import BeautifulSoup

def extract_and_save_page_content(json_file_path, output_file_path):
    with open(json_file_path, 'r') as file:
        data = json.load(file)

    first_link = data[0]["link"]

    response = requests.get(first_link)
    soup = BeautifulSoup(response.content, "html.parser")

    page_content = soup.get_text()

    result_data = {"link": first_link, "content": page_content}

    with open(output_file_path, 'w') as output_file:
        json.dump(result_data, output_file, indent=4)

    print(f"Page content saved in '{output_file_path}'")

json_file_path = r"NextNews\output.json"  
output_file_path = r"NextNews\scraped_page_data.json"
extract_and_save_page_content(json_file_path, output_file_path)
