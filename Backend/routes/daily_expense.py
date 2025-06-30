from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from schemas.daily_expense import DailyExpenseCreate, DailyExpense, DailyExpenseUpdate  # Import DailyExpenseUpdate
from services.daily_expense_services import create_daily_expense, get_daily_expenses, update_daily_expense, delete_daily_expense # Import update and delete
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

@router.put("/{expense_id}", response_model=DailyExpense)
def update_expense(expense_id: int, expense_update: DailyExpenseUpdate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    updated_expense = update_daily_expense(db, expense_id, expense_update, token_data.id)
    if not updated_expense:
        raise HTTPException(status_code=404, detail="Expense not found or unauthorized")
    return updated_expense

@router.delete("/{expense_id}", response_model=DailyExpense)
def remove_expense(expense_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    deleted = delete_daily_expense(db, expense_id, token_data.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Expense not found or unauthorized")
    return deleted