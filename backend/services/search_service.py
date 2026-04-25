import os
import asyncio
import httpx
from models.request_models import SearchRequest
from models.response_models import Product, SearchResponse
from utils.mock_data import get_mock_products

_SOURCE_DOMAINS = {
    "amazon": "Amazon",
    "flipkart": "Flipkart",
    "myntra": "Myntra",
    "nykaa": "Nykaa",
}


def _detect_source(item: dict) -> str:
    """Detect source platform from seller or link fields."""
    for field in ("seller", "link", "source"):
        val = (item.get(field) or "").lower()
        for domain, label in _SOURCE_DOMAINS.items():
            if domain in val:
                return label
    return "Other"


async def _fetch_shopping_results(
    client: httpx.AsyncClient,
    query: str,
    api_key: str,
) -> list[dict]:
    params = {
        "engine": "google_shopping",
        "q": query,
        "api_key": api_key,
        "gl": "in",
        "hl": "en",
        "num": 40,
    }
    try:
        response = await client.get(
            "https://www.searchapi.io/api/v1/search",
            params=params,
            timeout=15.0,
        )
        response.raise_for_status()
        return response.json().get("shopping_results", [])
    except Exception:
        return []


def _item_to_product(item: dict, source: str) -> Product:
    price = item.get("extracted_price") or item.get("price")
    try:
        price_float = float(price) if price is not None else None
    except (TypeError, ValueError):
        price_float = None
    price_display = f"₹{price_float:,.0f}" if price_float is not None else None

    return Product(
        title=item.get("title", ""),
        price=price_float,
        price_display=price_display,
        rating=item.get("rating"),
        review_count=item.get("reviews"),
        source=source,
        url=item.get("link"),
        image_url=item.get("thumbnail"),
    )


async def search_products(request: SearchRequest) -> SearchResponse:
    api_key = os.environ.get("SEARCHAPI_KEY", "")
    use_live = bool(api_key and api_key != "your_searchapi_key_here")

    if use_live:
        async with httpx.AsyncClient() as client:
            items = await _fetch_shopping_results(client, request.product_name, api_key)

        all_products: list[Product] = []
        for item in items:
            source = _detect_source(item)
            all_products.append(_item_to_product(item, source))

        is_mock = False

        if not all_products:
            raw_mocks = get_mock_products(request.product_name)
            all_products = [Product(**p) for p in raw_mocks]
            is_mock = True
    else:
        raw_mocks = get_mock_products(request.product_name)
        all_products = [Product(**p) for p in raw_mocks]
        is_mock = True

    sources_searched = list({p.source for p in all_products if p.source != "Other"}) or ["Amazon", "Flipkart", "Myntra", "Nykaa"]

    if request.max_price is not None:
        all_products = [p for p in all_products if p.price is None or p.price <= request.max_price]

    all_products.sort(
        key=lambda p: (p.rating or 0.0, p.review_count or 0),
        reverse=True,
    )

    return SearchResponse(
        products=all_products,
        total_count=len(all_products),
        sources_searched=sources_searched,
        is_mock_data=is_mock,
    )
