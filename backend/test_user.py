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
