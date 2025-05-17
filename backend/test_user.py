import pytest
from fastapi.testclient import TestClient
from typing import Any, Dict
from routers.user import router
from main import app

app.include_router(router)
client = TestClient(app)

TEST_USER_ID = "test-user-1"

# fake Suppabase stub setup
class FakeResp:
    def __init__(self, data: Dict[str, Any]):
        self.data = data
        self.status_code = 200
    def execute(self):
        return self

class FakeQuery:
    def __init__(self, resp: FakeResp):
        self._resp = resp
    def select(self, *args, **kwargs): return self
    def eq(self, *args, **kwargs): return self
    def single(self): return self
    def execute(self): return self._resp
    def update(self, payload): return self

@pytest.fixture(autouse=True)
def stub_supabase(monkeypatch):
    class Stub:
        next_resp = FakeResp({"favorite": []})
        def from_(self, tbl):
            return FakeQuery(self.next_resp)

    import routers.user as user_mod
    fake_sb = Stub()
    monkeypatch.setattr(user_mod, "sb", fake_sb)
    return fake_sb

# GET /user/favorite

def test_get_missing_header():
    r = client.get("/user/favorite")
    assert r.status_code == 401
    assert r.json()["detail"] == "ID header missing"

def test_get_empty_list(stub_supabase):
    stub_supabase.next_resp = FakeResp({"favorite": []})
    r = client.get("/user/favorite", headers={"ID": TEST_USER_ID})
    assert r.status_code == 200
    body = r.json()
    assert body["user_id"] == TEST_USER_ID
    assert body["recipes"] == []

def test_get_nonempty_list(stub_supabase):
    sample = [{"id": 42, "title": "Test"}]
    stub_supabase.next_resp = FakeResp({"favorite": sample})
    r = client.get("/user/favorite", headers={"ID": TEST_USER_ID})
    assert r.status_code == 200
    assert r.json()["recipes"] == sample

# POST /user/favorite

def test_post_appends_to_empty(stub_supabase):
    stub_supabase.next_resp = FakeResp({"favorite": None})
    new_recipe = {"id": 1, "title": "A"}
    r = client.post(
        "/user/favorite",
        headers={"ID": TEST_USER_ID},
        json=new_recipe
    )
    assert r.status_code == 200
    favs = r.json()["favorites"]
    assert favs == [new_recipe]

def test_post_appends_to_list(stub_supabase):
    existing = {"id": 2, "title": "B"}
    stub_supabase.next_resp = FakeResp({"favorite": existing})
    new_recipe = {"id": 3, "title": "C"}
    r = client.post(
        "/user/favorite",
        headers={"ID": TEST_USER_ID},
        json=new_recipe
    )
    assert r.status_code == 200
    favs = r.json()["favorites"]
    assert isinstance(favs, list)
    assert existing in favs and new_recipe in favs

# POST /user/favorite and GET /user/favorite Integration Test

def test_post_and_get_favorite(stub_supabase):
    stub_supabase.next_resp = FakeResp({"favorite": []})
    new_recipe = {"id": 99, "title": "IntegrationTestRecipe"}

    r_post = client.post(
        "/user/favorite",
        headers={"ID": TEST_USER_ID},
        json=new_recipe
    )
    assert r_post.status_code == 200
    favs = r_post.json()["favorites"]
    assert new_recipe in favs

    stub_supabase.next_resp = FakeResp({"favorite": [new_recipe]})
    r_get = client.get("/user/favorite", headers={"ID": TEST_USER_ID})
    assert r_get.status_code == 200
    body = r_get.json()
    assert body["user_id"] == TEST_USER_ID
    assert new_recipe in body["recipes"]

# Test for error condition: Simulating a Supabase query failure
def test_supabase_query_failure(stub_supabase):
    class ErrorResp:
        def __init__(self):
            self.status_code = 500
            self.data = None
        def execute(self):
            raise Exception("Supabase query failed")

    stub_supabase.next_resp = ErrorResp()

    r = client.get("/user/favorite", headers={"ID": TEST_USER_ID})
    assert r.status_code == 400
    assert "Supabase query failed" in r.json()["detail"]

# Test for expected interaction: Preventing duplicate recipes
def test_prevent_duplicate_recipes(stub_supabase):
    existing_recipe = {"id": 1, "title": "DuplicateTestRecipe"}
    stub_supabase.next_resp = FakeResp({"favorite": [existing_recipe]})

    r = client.post(
        "/user/favorite",
        headers={"ID": TEST_USER_ID},
        json=existing_recipe
    )
    assert r.status_code == 200
    favs = r.json()["favorites"]
    assert favs == [existing_recipe]