from typing import Optional
from pydantic import BaseModel


class SearchRequest(BaseModel):
    product_name: str
    max_price: Optional[float] = None
    brand_preference: Optional[str] = None
    country: Optional[str] = "IN"


class RecommendRequest(BaseModel):
    product_name: str
    products: list[dict]
    max_price: Optional[float] = None
    brand_preference: Optional[str] = None
    user_location: Optional[str] = None
