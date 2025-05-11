from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import google.generativeai as genai
import base64
import requests
from typing import List
from dotenv import load_dotenv
import os
from PIL import Image
import io

load_dotenv()

router = APIRouter()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')


async def get_ingredients_from_image(image_bytes: bytes) -> List[str]:
    try:
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(image_bytes))

        # Generate content using Gemini
        response = model.generate_content([
            "give me the list of ingredients you see in a comma separated string and in all lowercase. do not include any tools or utensils only food ingredients and spices. for example: 'ingredient_1, ingredient_2, ...' only output this list and don't use markdown",
            image
        ])

        # Parse the response to get ingredients
        ingredients_text = response.text.strip().lower()
        ingredients = [ingredient.strip()
                       for ingredient in ingredients_text.split(',')]
        return ingredients
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error analyzing image: {str(e)}")


async def get_recipes_from_ingredients(ingredients: List[str]) -> List[dict]:
    try:
        # Format ingredients for Spoonacular API
        ingredients_str = ','.join(ingredients)

        # Call Spoonacular API
        response = requests.get(
            f"https://api.spoonacular.com/recipes/findByIngredients",
            params={
                "apiKey": os.getenv("SPOONACULAR_API_KEY"),
                "ingredients": ingredients_str,
                "number": 5,
                "ignorePantry": True
            }
        )

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code,
                                detail="Error fetching recipes")

        return response.json()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching recipes: {str(e)}")


@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # Read the uploaded file
        contents = await file.read()

        # Get ingredients from image
        ingredients = await get_ingredients_from_image(contents)

        # Get recipes based on ingredients
        recipes = await get_recipes_from_ingredients(ingredients)

        return JSONResponse({
            "ingredients": ingredients,
            "recipes": recipes
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
