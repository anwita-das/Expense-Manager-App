from pydantic import BaseModel, ConfigDict
from datetime import datetime
import datetime as dt 
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


class DailyExpenseUpdate(BaseModel):

    type: Optional[str] = None
    amount: Optional[Decimal] = None
    description: Optional[str] = None
    datetime: Optional[dt.datetime] = None 
    category: Optional[str] = None
    payment_method: Optional[str] = None

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


class ExpenseSummary(BaseModel):
    total_earning: float
    total_spending: float
    balance: float    