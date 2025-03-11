from fastapi import APIRouter, HTTPException
from requests import RequestException, get
from os import getenv

router = APIRouter()


@router.get("/recipes/{recipe_id}")
async def get_single_recipe(recipe_id: int):
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
