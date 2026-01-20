from fastapi import FastAPI
from app.api.search import router as search_router
from app.api.forecast import router as forecast_router
from app.api.fraud import router as fraud_router
from app.api.recommend import router as recommend_router
from app.api.feedback import router as feedback_router

import os
import uvicorn

app = FastAPI(title="AI Service")

# Register routers
app.include_router(search_router, prefix="/search", tags=["Search"])
app.include_router(forecast_router, prefix="/forecast", tags=["Forecast"])
app.include_router(fraud_router, prefix="/fraud", tags=["Fraud"])
app.include_router(recommend_router, prefix="/recommend", tags=["Recommend"])
app.include_router(feedback_router, prefix="/feedback", tags=["Feedback"])

@app.get("/health")
def health():
    return {"status": "ai service up"}

# ✅ REQUIRED FOR RENDER DEPLOYMENT
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "app.core.main:app",
        host="0.0.0.0",
        port=port,
        log_level="info",
    )



# from fastapi import FastAPI
# from app.api.search import router as search_router
# from app.api.forecast import router as forecast_router
# from app.api.fraud import router as fraud_router
# from app.api.recommend import router as recommend_router
# from app.api.feedback import router as feedback_router

# app = FastAPI(title="AI Service")

# app.include_router(search_router, prefix="/search")
# app.include_router(forecast_router, prefix="/forecast")
# app.include_router(fraud_router, prefix="/fraud")
# app.include_router(recommend_router, prefix="/recommend")
# app.include_router(feedback_router, prefix="/feedback")

# @app.get("/health")
# def health():
#     return {"status": "ai service up"}
