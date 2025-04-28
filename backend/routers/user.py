import os
from supabase import create_client, Client
from fastapi import APIRouter, Request, HTTPException
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    raise ValueError("Supabase URL or Anon Key is missing in Env Variables")
    
supabase: Client = create_client(url, key)

router = APIRouter()

def get_supabase_client_with_Auth(token: str) -> Client:
    sb: Client = create_client(url,key)
    sb.auth.set_auth(token)
    return sb

@router.get("/user/favorite")
async def get_user_favorite(request: Request):
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.lower().startswith("bearer "):
            raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

        token = auth_header.split(" ", 1)[1].strip()
        supabase = get_supabase_client_with_Auth(token)

        user_resp = supabase.auth.get_user()
        user = user_resp.get("user")
        if not user:
            raise HTTPException(status_code=401, detail="Invalid or expired JWT")

        uid = user.get("id")
        response = supabase.table("favorites").select("*").eq("user_id", uid).execute()
        if response.get("error"):
            raise HTTPException(status_code=400, detail=response["error"]["message"])

        return {"user": user, "favorites": response.get("data")}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))