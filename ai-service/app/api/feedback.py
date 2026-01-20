from fastapi import APIRouter
from typing import Dict
from app.feedback_analyzer import analyze_feedback

router = APIRouter()

@router.post("/")
def analyze(payload: Dict):
    review = payload.get("review", "")
    return analyze_feedback(review)
