from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recipes
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="../.env")

# Initialize FastAPI app
app = FastAPI(
    title="ChefIT API", description="API for ChefIT application", version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
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
