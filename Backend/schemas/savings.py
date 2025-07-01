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

class savings(BaseModel):
    id: int
    book_id: int
    saving_type: str  
    amount: Decimal
    description: Optional[str] = None
    date: datetime
    frequency: str
    interest_rate: Decimal

    model_config = ConfigDict(from_attributes=True)