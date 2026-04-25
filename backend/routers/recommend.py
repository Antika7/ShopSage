import os
from fastapi import APIRouter, HTTPException
from models.request_models import RecommendRequest
from models.response_models import RecommendationResponse
from services.llm_service import get_recommendation

router = APIRouter()


@router.post("/recommend", response_model=RecommendationResponse)
async def recommend(request: RecommendRequest):
    if not os.environ.get("GEMINI_API_KEY") or os.environ.get("GEMINI_API_KEY") == "your_gemini_api_key_here":
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY not configured")
    try:
        return await get_recommendation(
            request.product_name,
            request.products,
            request.max_price,
            request.brand_preference,
            request.user_location,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
