from pydantic import BaseModel
from datetime import datetime
<<<<<<< HEAD

class BookCreate(BaseModel):
    name: str
    description: str
    type: str
=======
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
>>>>>>> origin/frontend

class BookOut(BaseModel):
    id: int
    name: str
    description: str
    type: str
    user_id: int
<<<<<<< HEAD
    updated_at: datetime
=======
    created_at: datetime  
    updated_at: Optional[datetime] = None  
>>>>>>> origin/frontend

    model_config = {
        "from_attributes": True
    }