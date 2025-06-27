from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
from decimal import Decimal  


class DailyExpenseCreate(BaseModel):
    book_id: int
    type: str
    amount: Decimal  
    description: Optional[str] = None
    datetime: datetime
    category: str
    payment_method: str

class DailyExpense(BaseModel):
    id: int
    book_id: int
    type: str
    amount: Decimal   
    description: Optional[str] = None
    datetime: datetime
    category: str
    payment_method: str

    model_config = ConfigDict(from_attributes=True)