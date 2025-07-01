from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from schemas.daily_expense import DailyExpenseCreate, DailyExpense
from services.daily_expense_services import create_daily_expense, get_daily_expenses

from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

router = APIRouter()

@router.post("/create", response_model=DailyExpense)
def add_daily_expense(expense: DailyExpenseCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    return create_daily_expense(db=db, expense=expense)

@router.get("/{book_id}", response_model=List[DailyExpense])
def read_daily_expenses(book_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    expenses = get_daily_expenses(db, book_id=book_id, skip=skip, limit=limit)
    return expenses