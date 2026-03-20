# main.py
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Header
from fastapi import Query
import base64
from dotenv import load_dotenv
import os
import urllib.parse
import httpx
from utils.time import time_ago
from starlette.middleware.sessions import SessionMiddleware
from fastapi import Request
from datetime import datetime, timedelta
from fastapi import Depends
from sqlalchemy.orm import Session
from database.models import UserToken
from database.database import get_db

from services.tokens import get_valid_token
from services.jwt_service import create_jwt_token, verify_jwt_token

load_dotenv()  # loads .env safely
FRONTEND_URL = os.getenv("FRONTEND_URL")
access_token = None

app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET"))

origins = [
    FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")



@app.get("/")
def read_root():
    return {"message": "Welcome!, client_id: " + SPOTIFY_CLIENT_ID}

@app.get("/login")
def login():
    print("Login hit!")
    scope = "user-top-read user-read-recently-played"
    params = {
        "response_type": "code",
        "client_id": SPOTIFY_CLIENT_ID,
        "scope": scope,
        "redirect_uri": SPOTIFY_REDIRECT_URI,
    }
    url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode(params)
    print("Login url: " + url)
    return RedirectResponse(url)


@app.get("/callback")
async def callback(request: Request, code: str = Query(...), db: Session = Depends(get_db)):
    global access_token
    auth_string = f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}"
    b64_auth = base64.b64encode(auth_string.encode()).decode()

    headers = {
        "Authorization": f"Basic {b64_auth}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": SPOTIFY_REDIRECT_URI
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://accounts.spotify.com/api/token",
            headers=headers,
            data=data
        )

        token_data = response.json()


        access_token = token_data["access_token"]
        refresh_token = token_data["refresh_token"]

        expires_in = token_data["expires_in"]
        expire_time = datetime.now() + timedelta(seconds=expires_in)

        token_expires = int(expire_time.timestamp())

        # get user info
        user_data_response = await client.get(
            "https://api.spotify.com/v1/me",
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )

        user_data = user_data_response.json()
        spotify_id = user_data["id"]
        display_name = user_data["display_name"]

        #check if user already exists
        existing_user = db.query(UserToken).filter(UserToken.spotify_user_id == spotify_id).first()

        if existing_user:
            existing_user.access_token = access_token
            existing_user.refresh_token = refresh_token
            existing_user.expires_at = token_expires
        else:
            new_user = UserToken(
                spotify_user_id=spotify_id,
                display_name=display_name,
                access_token=access_token,
                refresh_token=refresh_token,
                expires_at=token_expires
            )
            db.add(new_user)

    db.commit()

    token = create_jwt_token(spotify_id)
    return RedirectResponse(f"{FRONTEND_URL}/dashboard?token={token}")

@app.get("/me")
async def get_user(authorization: str = Header(...), db: Session = Depends(get_db)):

    token = authorization.split(" ")[1]

    spotify_id = verify_jwt_token(token)
    access_token = await get_valid_token(spotify_id, db)

    async with httpx.AsyncClient() as client:

        response = await client.get(
            "https://api.spotify.com/v1/me",
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )

    return response.json()

@app.get("/top-artists")
async def get_top_artists(authorization: str = Header(...), db: Session = Depends(get_db), time_range: str = "medium_term"):

    token = authorization.split(" ")[1]

    spotify_id = verify_jwt_token(token)
    access_token = await get_valid_token(spotify_id, db)

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.spotify.com/v1/me/top/artists",
            headers={
                "Authorization" : f"Bearer {access_token}"
            },
            params={
                "limit": 10,
                "time_range" : time_range
            }            
        )
    return response.json()

@app.get("/top-songs")
async def get_top_songs(authorization: str = Header(...), db: Session = Depends(get_db), time_range: str = "medium_term"):

    token = authorization.split(" ")[1]

    spotify_id = verify_jwt_token(token)
    access_token = await get_valid_token(spotify_id, db)

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.spotify.com/v1/me/top/tracks",
            headers={
                "Authorization" : f"Bearer {access_token}"
            },
            params={
                "limit": 20,
                "time_range": time_range
            }            
        )
    return response.json()

@app.get("/recentlyplayed")
async def recently_played(authorization: str = Header(...), db: Session = Depends(get_db)):

    token = authorization.split(" ")[1]

    spotify_id = verify_jwt_token(token)
    access_token = await get_valid_token(spotify_id, db)

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.spotify.com/v1/me/player/recently-played",
            headers={
                "Authorization" : f"Bearer {access_token}"
            }
        )
    
    data = response.json()

    for item in data["items"]:
        item["played_at_human"] = time_ago(item["played_at"])

    return data
    
