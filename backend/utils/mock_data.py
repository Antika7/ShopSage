import itertools

_SOURCES = itertools.cycle(["Amazon", "Flipkart", "Myntra", "Nykaa"])

_MOCK_TEMPLATES = [
    {
        "suffix": "Premium Edition",
        "price": 4999.0,
        "price_display": "₹4,999",
        "rating": 4.7,
        "review_count": 18320,
    },
    {
        "suffix": "Pro Max",
        "price": 3499.0,
        "price_display": "₹3,499",
        "rating": 4.5,
        "review_count": 9870,
    },
    {
        "suffix": "Standard",
        "price": 1299.0,
        "price_display": "₹1,299",
        "rating": 4.3,
        "review_count": 5430,
    },
    {
        "suffix": "Lite",
        "price": 799.0,
        "price_display": "₹799",
        "rating": 4.1,
        "review_count": 3210,
    },
    {
        "suffix": "Budget Pack",
        "price": 549.0,
        "price_display": "₹549",
        "rating": 3.9,
        "review_count": 2100,
    },
    {
        "suffix": "Value Edition",
        "price": 999.0,
        "price_display": "₹999",
        "rating": 4.0,
        "review_count": 4780,
    },
    {
        "suffix": "Classic",
        "price": 1799.0,
        "price_display": "₹1,799",
        "rating": 4.4,
        "review_count": 7650,
    },
    {
        "suffix": "Ultra",
        "price": 2999.0,
        "price_display": "₹2,999",
        "rating": 4.6,
        "review_count": 12440,
    },
    {
        "suffix": "Mini",
        "price": 649.0,
        "price_display": "₹649",
        "rating": 3.2,
        "review_count": 870,
    },
    {
        "suffix": "Combo Pack",
        "price": 1499.0,
        "price_display": "₹1,499",
        "rating": 3.8,
        "review_count": 1590,
    },
]

_SOURCE_CYCLE = ["Amazon", "Flipkart", "Myntra", "Nykaa", "Amazon", "Flipkart", "Myntra", "Nykaa", "Amazon", "Flipkart"]


def get_mock_products(product_name: str) -> list[dict]:
    """Return 10 realistic mock products whose titles include the given product_name."""
    products: list[dict] = []
    for i, template in enumerate(_MOCK_TEMPLATES):
        source = _SOURCE_CYCLE[i]
        products.append(
            {
                "title": f"{product_name} – {template['suffix']} ({source})",
                "price": template["price"],
                "price_display": template["price_display"],
                "rating": template["rating"],
                "review_count": template["review_count"],
                "source": source,
                "url": "#",
                "image_url": "",
            }
        )
    return products
