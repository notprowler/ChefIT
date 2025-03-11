from fastapi import FastAPI
from routers import single_recipe
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="../.env")

# Initialize FastAPI app
app = FastAPI(
    title="ChefIT API", description="API for ChefIT application", version="1.0.0"
)


@app.get("/")  # Root endpoint
async def root():
    return {"message": "Welcome to ChefIT API"}


@app.get("/health")  # Health check endpoint
async def health_check():
    return {"status": "healthy"}


# Get Single Recipe
app.include_router(single_recipe.router)
