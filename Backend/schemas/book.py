from pydantic import BaseModel
from datetime import datetime

class BookCreate(BaseModel):
    name: str
    description: str
    type: str

class BookOut(BaseModel):
    id: int
    name: str
    description: str
    type: str
    user_id: int
    updated_at: datetime

    class Config:
        orm_mode = True