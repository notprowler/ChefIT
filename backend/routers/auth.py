from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

class LoginResponse(BaseModel):
    access_token: str
    token_type: str

@router.post("/login", response_model=LoginResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Dummy login route to return a fixed access token and token type.
    """
    return {"access_token": "dummy_access_token", "token_type": "bearer"}

@router.post("/signup")
async def signup():
    """
    Dummy signup route to return a success message.
    """
    return {"message": "Signup successful"}