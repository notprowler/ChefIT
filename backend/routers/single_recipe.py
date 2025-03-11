from fastapi import APIRouter, HTTPException
from requests import RequestException

router = APIRouter()


@router.get("/recipes/{recipe_id}")
async def get_single_recipe(recipe_id: int):
    try:
        return {"id": recipe_id, "name": "Recipe 1", "description": "Description 1"}
    except RequestException as e:
        raise HTTPException(
            status_code=500, detail=f"Error calling Spoonacular API: {str(e)}")
