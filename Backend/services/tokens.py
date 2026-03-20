import httpx
from datetime import datetime, timedelta
import os
import base64
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from database.models import UserToken

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

async def refresh_access_token(user: UserToken, db: Session ):
    auth_string = f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}"
    b64_auth = base64.b64encode(auth_string.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_auth}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "refresh_token",
        "refresh_token": user.refresh_token
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://accounts.spotify.com/api/token",
            headers=headers,
            data=data
        )

    token_data = response.json()

    user.access_token = token_data["access_token"]
    user.expires_at = int(datetime.now().timestamp()) + token_data["expires_in"]

    db.commit()

    return user.access_token
   

async def get_valid_token(spotify_id: str, db: Session):

    user = db.query(UserToken).filter(UserToken.spotify_user_id == spotify_id).first()
    
    if not user: 
        return None
    
    now = int(datetime.now().timestamp())

    # if access token is expired
    if now >= user.expires_at:
        return await refresh_access_token(user, db)
    
    return user.access_token