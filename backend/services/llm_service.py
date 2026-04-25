import os
import json
import re
import google.generativeai as genai
from models.response_models import RecommendationResponse, Product


async def get_recommendation(
    product_name: str,
    products: list[dict],
    max_price: float | None,
    brand_preference: str | None,
    user_location: str | None,
) -> RecommendationResponse:
    """Call Gemini to rank products and pick the best one for the user."""

    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel("gemini-2.5-flash")

    # Limit to 12 products to keep the prompt manageable
    product_summary = json.dumps(products[:12], indent=2)

    prompt = f"""You are ShopSage, an expert product recommendation assistant for Indian e-commerce shoppers.

Products found for "{product_name}":
{product_summary}

User preferences:
- Maximum budget: {max_price if max_price else "No limit specified"}
- Brand preference: {brand_preference if brand_preference else "No preference"}
- Location: {user_location if user_location else "India"}

Analyze by: price-to-value ratio, rating, review count, brand reputation.
Respond ONLY with valid JSON (no markdown, no prose):
{{
  "best_pick_title": "<exact title from the list above>",
  "reasoning": "<2-3 sentences for an Indian shopper>",
  "ranked_list": [
    {{"rank": 1, "title": "<title>", "score_explanation": "<one sentence>"}}
  ]
}}"""

    response = model.generate_content(prompt)
    raw_text = response.text.strip()

    # Strip markdown code fences if present
    raw_text = re.sub(r"^```(?:json)?\s*", "", raw_text)
    raw_text = re.sub(r"\s*```$", "", raw_text)

    # Parse JSON — try directly first, then extract from surrounding text
    data: dict = {}
    try:
        data = json.loads(raw_text)
    except (json.JSONDecodeError, ValueError):
        match = re.search(r"\{.*\}", raw_text, re.DOTALL)
        if match:
            try:
                data = json.loads(match.group())
            except (json.JSONDecodeError, ValueError):
                data = {}

    if not data:
        # Fallback: pick the product with the highest rating + review count
        best = max(
            products,
            key=lambda p: (p.get("rating") or 0, p.get("review_count") or 0),
        )
        data = {
            "best_pick_title": best["title"],
            "reasoning": "Selected based on highest rating and review count.",
            "ranked_list": [
                {"rank": 1, "title": best["title"], "score_explanation": "Highest rating."}
            ],
        }

    # Match best_pick_title back to a product dict (exact, then case-insensitive substring)
    best_title = data.get("best_pick_title", "")
    best_product_dict = (
        next((p for p in products if p.get("title") == best_title), None)
        or next((p for p in products if best_title.lower() in (p.get("title") or "").lower()), None)
        or next((p for p in products if (p.get("title") or "").lower() in best_title.lower()), None)
        or (products[0] if products else None)
    )

    if not best_product_dict:
        raise ValueError("No products available to recommend")

    return RecommendationResponse(
        best_pick=Product(**best_product_dict),
        reasoning=data.get("reasoning", ""),
        ranked_list=data.get("ranked_list", []),
        raw_response=raw_text,
    )
