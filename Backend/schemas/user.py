from pydantic import BaseModel, EmailStr, ConfigDict
 
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
 
class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    currency_preference: str
    profile_photo_url: str | None = None
    model_config = ConfigDict(from_attributes=True)
 
class UserUpdate(BaseModel):
    name: str
    email: EmailStr
    currency_preference: str
 
class Token(BaseModel):
    access_token: str
    token_type: str
 
class UserLogin(BaseModel):
    email: EmailStr
    password: str    