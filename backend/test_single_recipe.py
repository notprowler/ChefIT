from fastapi.testclient import TestClient
from routers.single_recipe import get_single_recipe
from main import app

client = TestClient(app)

def test_get_single_recipe():
    response = client.get("/recipes/716429")
    assert response.status_code == 200
    recipe = response.json()
    assert isinstance(recipe, dict)
    assert recipe.get("id") == 716429 