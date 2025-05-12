from os import getenv
from fastapi import APIRouter, Request, HTTPException, status, Body
from supabase import create_client, AsyncClient
from requests import RequestException, get
from typing import Any, List, Dict
import httpx
from dotenv import load_dotenv
load_dotenv()

URL = getenv("VITE_SUPABASE_URL")
KEY = getenv("VITE_SUPABASE_ANON_KEY")

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

    # 2) query Postgres for that user's stored recipe objects
    resp = sb.from_("user") \
             .select("favorite") \
             .eq("UID", user_id) \
             .single() \
             .execute()

    # 3) pull the JSON array of recipes
    recipes: List[Any] = resp.data.get("favorite") or []

    # 4) return to client
    return {
        "user_id": user_id,
        "recipes": recipes
    }



@router.post("/user/favorite")
async def set_user_favorite(request: Request, recipe: Dict[str, Any] = Body(...)):
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
        
        raw = resp.data.get("favorite")
        # 2) coerce to a list
        if raw is None:
            current: List[Any] = []
        elif isinstance(raw, list):
            current = raw
        else:
            # if it's a dict (or anything else), wrap it into a one-element list
            current = [raw]

        # 3) append the new recipe object
        updated = current + [recipe]


        upd = sb.from_("user") \
                .update({"favorite": updated}) \
                .eq("UID", user_id) \
                .execute()

        return {"user_id": user_id, "favorites": updated}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))