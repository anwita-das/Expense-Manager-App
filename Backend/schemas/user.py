from pydantic import BaseModel, EmailStr, ConfigDict 

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True) 

class Token(BaseModel):
    access_token: str
    token_type: str 

class UserLogin(BaseModel):
    email: EmailStr
    password: str    