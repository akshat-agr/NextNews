import json

def extract_titles_and_links(json_file_path, output_file_path):
    try:
        # Load the JSON file
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Extracting titles and links
        result = []

        for item in data:
            # Extract highlight titles and links
            highlight = item.get("highlight", {})
            if "title" in highlight and "link" in highlight:
                result.append({"title": highlight["title"], "link": highlight["link"]})

            # Extract stories titles and links
            stories = item.get("stories", [])
            for story in stories:
                title = story.get("title")
                link = story.get("link")
                if title and link:
                    result.append({"title": title, "link": link})

        # Write results to a JSON file
        with open(output_file_path, 'w') as output_file:
            json.dump(result, output_file, indent=4)

        print(f"Results saved to {output_file_path}")

    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error reading JSON file: {e}")

input_file_path = r"NextNews\esults.json"  
output_file_path = r"NextNews\output.json"  
extract_titles_and_links(input_file_path, output_file_path)
