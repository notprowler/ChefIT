from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestSingleRecipe:
    def test_get_recipe_by_id_success(self):
        # Define a sample recipe ID
        recipe_id = 716429

        # Make request to the endpoint
        response = client.get(f"/recipes/{recipe_id}")

        # Assert response
        assert response.status_code == 200

        # Assert that the response contains a single recipe object
        recipe_data = response.json()
        assert isinstance(recipe_data, dict)

        # Check that the returned recipe has the correct ID
        assert recipe_data.get("id") == recipe_id

    def test_get_recipe_by_letters(self):
        recipe_id = "abc"

        response = client.get(f"/recipes/{recipe_id}")

        assert response.status_code == 422
        assert response.json() == {
            "detail": "Invalid recipe ID format. ID must be numeric."}

    def test_get_recipe_by_negative_number(self):
        recipe_id = -1

        response = client.get(f"/recipes/{recipe_id}")

        assert response.status_code == 422

    def test_get_recipe_no_input(self):
        response = client.get("/recipes/")

        assert response.status_code == 422
