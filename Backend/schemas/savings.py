from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
from decimal import Decimal

class savingsCreate(BaseModel):
    book_id: int
    saving_type: str  
    amount: Decimal
    description: Optional[str] = None
    date: datetime
    frequency: str
    interest_rate: Decimal

class savingsUpdate(BaseModel):

    saving_type: Optional[str] = None
    amount: Optional[Decimal] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    frequency: Optional[str] = None
    interest_rate: Optional[Decimal] = None

class savings(BaseModel):
    id: int
    book_id: int
    saving_type: str  
    amount: Decimal
    description: Optional[str] = None
    date: datetime
    frequency: Optional[str] = None
    interest_rate: Decimal

    model_config = ConfigDict(from_attributes=True)