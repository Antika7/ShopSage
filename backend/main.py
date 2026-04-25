import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env before importing routers (so services
# can read keys at import time if needed).
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from routers import location, search, recommend  # noqa: E402

app = FastAPI(
    title="ShopSage API",
    description="AI-powered product search and recommendation backend.",
    version="1.0.0",
)

# Allow the Vite dev-server origin during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all routers under /api
app.include_router(location.router, prefix="/api")
app.include_router(search.router, prefix="/api")
app.include_router(recommend.router, prefix="/api")


@app.get("/")
async def health_check():
    return {"status": "ok", "service": "ShopSage API"}
