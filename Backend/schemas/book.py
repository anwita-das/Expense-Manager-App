from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from decimal import Decimal

class BookBase(BaseModel):
    title: str
    description: str
    type: str
    amount: float

class BookCreate(BookBase):
    pass


class BookUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    amount: Optional[float] = None

class BookOut(BaseModel):
    id: int
    title: str
    description: str
    type: str
    amount: float
    user_id: int
    created_at: datetime  
    updated_at: Optional[datetime] = None

    model_config = {
        "from_attributes": True
    }