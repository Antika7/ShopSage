import httpx
from models.response_models import LocationResponse

_FALLBACK = LocationResponse(
    city="Mumbai",
    region="Maharashtra",
    country="India",
    country_code="IN",
)


async def get_user_location() -> LocationResponse:
    """Detect the caller's location using ip-api.com.

    Falls back to a Mumbai default on any network or parsing error.
    """
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get("http://ip-api.com/json/")
            response.raise_for_status()
            data = response.json()

        if data.get("status") != "success":
            return _FALLBACK

        return LocationResponse(
            city=data.get("city", "Mumbai"),
            region=data.get("regionName", "Maharashtra"),
            country=data.get("country", "India"),
            country_code=data.get("countryCode", "IN"),
        )
    except Exception:
        return _FALLBACK
