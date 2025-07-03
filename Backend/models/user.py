from sqlalchemy import Column, Integer, String
from db.session import Base
 
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    currency_preference = Column(String, default="INR")
    profile_photo_url = Column(String, nullable=True)