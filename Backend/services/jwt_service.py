import jwt 
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta


SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"


def create_jwt_token(spotify_id: str):

    payload = {
        "spotify_id": spotify_id,
        "exp": datetime.now() + timedelta(days=30)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    
    return token

def verify_jwt_token(token:str):

    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    return payload["spotify_id"]