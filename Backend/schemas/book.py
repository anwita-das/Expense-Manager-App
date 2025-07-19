from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BookBase(BaseModel):
    title: str
    description: str
    type: str

class BookCreate(BookBase):
    pass


class BookUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None

class BookOut(BaseModel):
    id: int
    title: str
    description: str
    type: str
    user_id: int
    created_at: datetime  
    updated_at: Optional[datetime] = None 
    amount: Optional[float] = None 


    model_config = {
        "from_attributes": True
    }