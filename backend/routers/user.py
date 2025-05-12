from os import getenv
from fastapi import APIRouter, Request, HTTPException, status
from supabase import create_client, AsyncClient
from typing import Any, List

URL = getenv("SUPABASE_URL")
KEY = getenv("SUPABASE_ANON_KEY")

if not URL or not KEY:
    raise ValueError("Supabase URL or Anon Key is missing in Env Variables")

# We only need one AsyncClient since we’re not using supabase.auth here
sb = create_client(URL, KEY)

router = APIRouter()

@router.get("/user/favorite")
async def get_user_favorite(request: Request) -> Any:
    # 1) grab the raw user ID from a custom header
    user_id = request.headers.get("ID")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ID header missing"
        )

    # 2) directly query Postgres for that ID’s favorites
    fav_resp = sb.from_("user") \
                       .select("favorite") \
                       .eq("UID", user_id) \
                       .single() \
                       .execute()

    favorites: List[Any] = fav_resp.data.get("favorite", [])

    return {"user_id": user_id, "favorites": favorites}


@router.post("/user/favorite")
async def set_user_favorite(request: Request, recipe_id: int):
    try:
        user_id = request.headers.get("ID")
        if not user_id:
            raise HTTPException(status_code=401, detail="ID header missing")

        # fetch current favorites
        resp = sb.from_("user") \
                .select("favorite") \
                .eq("UID", user_id) \
                .single() \
                .execute()
        
        current: List[int] = resp.data.get("favorite") or []

        updated = current + [recipe_id]

        upd = sb.from_("user") \
                .update({"favorite": updated}) \
                .eq("UID", user_id) \
                .execute()

        return {"user_id": user_id, "favorites": updated}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))