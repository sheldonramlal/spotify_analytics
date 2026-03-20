from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class UserToken(Base):
    __tablename__ = "user_tokens"

    id = Column(Integer, primary_key=True, index=True)
    display_name = Column(String)
    spotify_user_id = Column(String, unique=True)
    access_token = Column(String)
    refresh_token = Column(String)
    expires_at = Column(BigInteger)