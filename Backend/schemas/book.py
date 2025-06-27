from pydantic import BaseModel

class BookCreate(BaseModel):
    title: str
    description: str
    type: str
    user_id: int

class BookOut(BaseModel):
    id: int
    title: str
    description: str
    type: str
    user_id: int

    class Config:
        orm_mode = True