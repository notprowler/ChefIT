import pytest
from fastapi import HTTPException
from routers import gemini
import types
import asyncio

class DummyResponse:
    def __init__(self, text, status_code=200):
        self.text = text
        self.status_code = status_code
    def json(self):
        return [{"id": 1, "title": "Dummy Recipe"}]


def test_get_ingredients_from_image_success(monkeypatch):
    class DummyModel:
        def generate_content(self, args):
            class Resp:
                text = "tomato, cheese"
            return Resp()
    monkeypatch.setattr(gemini, "model", DummyModel())
    # Moc PIL.Image.open to avoid real image
    monkeypatch.setattr(gemini.Image, "open", lambda x: object())
    # PNG header + dummy data
    image_bytes = b"\x89PNG\r\n\x1a\n" + b"0" * 100
    result = asyncio.run(gemini.get_ingredients_from_image(image_bytes))
    assert result == ["tomato", "cheese"]

def test_get_ingredients_from_image_error(monkeypatch):
    class DummyModel:
        def generate_content(self, args):
            raise Exception("Gemini error")
    monkeypatch.setattr(gemini, "model", DummyModel())
    monkeypatch.setattr(gemini.Image, "open", lambda x: object())
    image_bytes = b"notanimage"
    with pytest.raises(HTTPException) as exc:
        asyncio.run(gemini.get_ingredients_from_image(image_bytes))
    assert "Error analyzing image" in str(exc.value.detail)

def test_get_recipes_from_ingredients_success(monkeypatch):
    def dummy_get(url, params):
        return DummyResponse("", 200)
    monkeypatch.setattr(gemini.requests, "get", dummy_get)
    result = asyncio.run(gemini.get_recipes_from_ingredients(["tomato", "cheese"]))
    assert result[0]["title"] == "Dummy Recipe"

def test_get_recipes_from_ingredients_api_error(monkeypatch):
    def dummy_get(url, params):
        return DummyResponse("", 500)
    monkeypatch.setattr(gemini.requests, "get", dummy_get)
    with pytest.raises(HTTPException) as exc:
        asyncio.run(gemini.get_recipes_from_ingredients(["tomato"]))
    assert "Error fetching recipes" in str(exc.value.detail)

def test_get_ingredients_from_image_empty(monkeypatch):
    class DummyModel:
        def generate_content(self, args):
            class Resp:
                text = "  "
            return Resp()
    monkeypatch.setattr(gemini, "model", DummyModel())
    monkeypatch.setattr(gemini.Image, "open", lambda x: object())
    image_bytes = b"\x89PNG\r\n\x1a\n" + b"0" * 100
    result = asyncio.run(gemini.get_ingredients_from_image(image_bytes))
    assert result == [""]
