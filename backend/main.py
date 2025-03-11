from fastapi import FastAPI
from routers import single_recipe
# Initialize FastAPI app
app = FastAPI(
    title="ChefIT API",
    description="API for ChefIT application",
    version="1.0.0"
)

# Root endpoint


@app.get("/")
async def root():
    return {"message": "Welcome to ChefIT API"}

# Health check endpoint


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Get Single Recipe
app.include_router(single_recipe.router)
