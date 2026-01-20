from typing import Dict

def forecast_attendance(event_features: Dict) -> Dict:
    """
    Simple demand forecasting logic (baseline model)
    """

    base_demand = 50  # baseline attendees

    # Category impact
    category_weights = {
        "Tech": 1.5,
        "Music": 1.8,
        "Comedy": 1.2,
        "Sports": 2.0,
        "Workshop": 1.0
    }

    category = event_features.get("category", "Workshop")
    city = event_features.get("city", "Other")
    days_to_event = event_features.get("days_to_event", 10)

    demand = base_demand

    # Category factor
    demand *= category_weights.get(category, 1.0)

    # City factor
    if city in ["Bangalore", "Mumbai", "Delhi"]:
        demand *= 1.3

    # Time factor (closer events spike demand)
    if days_to_event <= 3:
        demand *= 1.4
    elif days_to_event <= 7:
        demand *= 1.2

    return {
        "predicted_attendance": int(demand),
        "confidence": "MEDIUM"
    }
