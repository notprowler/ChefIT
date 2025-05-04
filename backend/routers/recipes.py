from fastapi import APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from requests import RequestException, get
from os import getenv

router = APIRouter()

from os import getenv

@router.get("/recipes/{recipe_id}")
async def get_single_recipe(recipe_id: int):
    print("SPOONACULAR_API_KEY =", getenv("SPOONACULAR_API_KEY"))

    try:
        response = get(
            f"https://api.spoonacular.com/recipes/{recipe_id}/information",
            params={
                "apiKey": getenv("SPOONACULAR_API_KEY"),
                "includeNutrition": False,
            },
        )
        return response.json()

    except RequestException as e:
        raise HTTPException(
            status_code=500, detail=f"Error calling Spoonacular API: {str(e)}")


@router.get("/recipes")
async def get_random_recipes():
    try:
        response = get(
            "https://api.spoonacular.com/recipes/random",
            params={
                "apiKey": getenv("SPOONACULAR_API_KEY"),
                "number": 20,
            },
        )
        return response.json()

    except RequestException as e:
        raise HTTPException(
            status_code=500, detail=f"Error calling Spoonacular API: {str(e)}")


@router.get("/recipes/search-by-ingredients")
async def search_recipes_by_ingredients(ingredients: str):
    """
    Search recipes based on available ingredients.
    :param ingredients: Comma-separated list of ingredients.
    """
    try:
        response = get(
            "https://api.spoonacular.com/recipes/findByIngredients",
            params={
                "apiKey": getenv("SPOONACULAR_API_KEY"),
                "ingredients": ingredients,
                "number": 10,
            },
        )
        return response.json()

    except RequestException as e:
        raise HTTPException(
            status_code=500, detail=f"Error calling Spoonacular API: {str(e)}")