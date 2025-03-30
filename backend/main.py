from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recipes
from dotenv import load_dotenv
import os

# Try to load from .env file, but don't fail if it doesn't exist
load_dotenv(dotenv_path="../.env")

# Verify API key is available
api_key = os.getenv("SPOONACULAR_API_KEY")
if not api_key:
    raise ValueError("SPOONACULAR_API_KEY environment variable is not set")

# Initialize FastAPI app
app = FastAPI(
    title="ChefIT API", description="API for ChefIT application", version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")  # Root endpoint
async def root():
    return {"message": "Welcome to ChefIT API"}


@app.get("/health")  # Health check endpoint
async def health_check():
    return {"status": "healthy"}


# Get Single Recipe
app.include_router(recipes.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
