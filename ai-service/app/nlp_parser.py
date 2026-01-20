import re
from typing import Optional, Dict

def parse_search_query(query: str) -> Dict:
    query = query.lower()

    result = {
        "city": None,
        "category": None,
        "max_price": None,
        "date_range": None
    }

    # ---------- CATEGORY ----------
    if "tech" in query:
        result["category"] = "Tech"
    elif "music" in query:
        result["category"] = "Music"
    elif "comedy" in query:
        result["category"] = "Comedy"
    elif "sports" in query:
        result["category"] = "Sports"
    elif "workshop" in query:
        result["category"] = "Workshop"

    # ---------- CITY ----------
    cities = ["bangalore", "mumbai", "delhi", "chennai", "hyderabad"]
    for city in cities:
        if city in query:
            result["city"] = city.capitalize()

    # ---------- PRICE ----------
    price_match = re.search(r"under\s+(\d+)", query)
    if price_match:
        result["max_price"] = int(price_match.group(1))

    # ---------- DATE ----------
    if "this weekend" in query:
        result["date_range"] = "THIS_WEEKEND"
    elif "next weekend" in query:
        result["date_range"] = "NEXT_WEEKEND"
    elif "today" in query:
        result["date_range"] = "TODAY"

    return result
