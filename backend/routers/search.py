from fastapi import APIRouter, HTTPException
from models.request_models import SearchRequest
from models.response_models import SearchResponse
from services.search_service import search_products

router = APIRouter()


@router.post("/search", response_model=SearchResponse)
async def search(request: SearchRequest):
    try:
        return await search_products(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
