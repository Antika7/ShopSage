from fastapi import APIRouter
from models.response_models import LocationResponse
from services.location_service import get_user_location

router = APIRouter()


@router.get("/location", response_model=LocationResponse)
async def detect_location():
    return await get_user_location()
