from typing import Optional
from pydantic import BaseModel


class LocationResponse(BaseModel):
    city: str
    region: str
    country: str
    country_code: str


class Product(BaseModel):
    title: str
    price: Optional[float] = None
    price_display: Optional[str] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    source: str
    url: Optional[str] = None
    image_url: Optional[str] = None


class SearchResponse(BaseModel):
    products: list[Product]
    total_count: int
    sources_searched: list[str]
    is_mock_data: bool


class RecommendationResponse(BaseModel):
    best_pick: Product
    reasoning: str
    ranked_list: list[dict]
    raw_response: str
