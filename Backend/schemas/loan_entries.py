from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
from decimal import Decimal

class LoanEntryCreate(BaseModel):
    book_id: int
    type: str 
    amount: Decimal
    description: Optional[str] = None
    date: datetime
    category: str

class LoanEntryUpdate(BaseModel):
    type: Optional[str] = None
    amount: Optional[Decimal] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    category: Optional[str] = None  

class LoanEntry(BaseModel):
    id: int
    book_id: int
    type: str
    amount: Decimal
    description: Optional[str] = None
    date: datetime
    category: str


    model_config = ConfigDict(from_attributes=True)