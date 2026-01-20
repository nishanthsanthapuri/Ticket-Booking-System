from fastapi import APIRouter
from typing import Dict
from app.fraud_detector import detect_fraud

router = APIRouter()

@router.post("/")
def assess_fraud(payload: Dict):
    return detect_fraud(payload)
