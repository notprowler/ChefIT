from routers import recipes, gemini, user
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")


# Initialize FastAPI app
app = FastAPI(
    title="ChefIT API",
    description="API for ChefIT application",
    version="1.0.0"
)

# Configure CORS with increased header size limits
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,  # Must be False when allow_origins is ["*"]
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600,
)


@app.get("/")  # Root endpoint
async def root():
    return {"message": "Welcome to ChefIT API"}


@app.get("/health")  # Health check endpoint
async def health_check():
    return {"status": "healthy"}


# Get Single Recipe
app.include_router(recipes.router)
app.include_router(gemini.router, prefix="/gemini", tags=["gemini"])
app.include_router(user.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
