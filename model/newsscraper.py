import json
from serpapi import GoogleSearch

params = {
    "engine": "google_news",
    "gl": "in",
    "hl": "en",
    "topic_token": "CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ",
    "api_key": "c3550daff1993dfb2163f83161c9f284d9fb12f5fe20d0a1c9451fd9f4e44608"
}

search = GoogleSearch(params)
results = search.get_dict()

news_results = results.get("news_results", [])

with open("news_results.json", "w") as file:
    json.dump(news_results, file, indent=4)

