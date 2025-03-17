from fastapi.testclient import TestClient
from backend.routers.recipes import get_single_recipe, get_random_recipes
from main import app

client = TestClient(app)


def test_get_single_recipe():
    response = client.get("/recipes/716429")
    assert response.status_code == 200
    recipe = response.json()
    assert isinstance(recipe, dict)
    assert recipe.get("id") == 716429


def test_get_random_recipes():
    response = client.get("/recipes")
    assert response.status_code == 200
    data = response.json()
    assert "recipes" in data
    # Check that we have 20 recipes in the array
    assert len(data["recipes"]) == 20
