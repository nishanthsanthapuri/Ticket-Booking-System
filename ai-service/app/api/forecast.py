from fastapi import APIRouter
from typing import Dict
from app.demand_forecaster import forecast_attendance

router = APIRouter()

@router.post("/")
def forecast(payload: Dict):
    return forecast_attendance(payload)
