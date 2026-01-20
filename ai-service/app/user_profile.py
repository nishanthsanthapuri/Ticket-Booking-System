from typing import List, Dict

def build_user_profile(interactions: List[Dict]) -> Dict:
    """
    Build user preference profile from interactions
    """

    categories = {}
    cities = {}

    for interaction in interactions:
        category = interaction.get("category")
        city = interaction.get("city")

        if category:
            categories[category] = categories.get(category, 0) + 1

        if city:
            cities[city] = cities.get(city, 0) + 1

    preferred_category = max(categories, key=categories.get) if categories else None
    preferred_city = max(cities, key=cities.get) if cities else None

    return {
        "preferred_category": preferred_category,
        "preferred_city": preferred_city
    }
