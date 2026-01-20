from fastapi import APIRouter
from typing import Dict, List
from app.user_profile import build_user_profile
from app.recommender import recommend_events
from app.mock_events import MOCK_EVENTS

router = APIRouter()

@router.post("/")
def recommend(payload: Dict):
    interactions: List[Dict] = payload.get("interactions", [])

    user_profile = build_user_profile(interactions)
    recommendations = recommend_events(user_profile, MOCK_EVENTS)

    return {
        "user_profile": user_profile,
        "recommendations": recommendations
    }
