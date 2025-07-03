# routes/daily_expense.py

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

# 1. Cleaned up imports - no duplicates.
from schemas.daily_expense import DailyExpenseCreate, DailyExpenseOut, DailyExpenseUpdate
from services.daily_expense_services import (
    create_daily_expense, 
    get_daily_expenses, 
    get_one_daily_expense,
    update_daily_expense, 
    delete_daily_expense
)
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

# 2. Added a prefix and tags for better organization and cleaner API docs.
router = APIRouter(
    prefix="/daily-expenses",
    tags=['Daily Expenses']
)

# 3. Changed path to "/" and set a 201 status code for successful creation.
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=DailyExpenseOut)
def add_daily_expense(expense: DailyExpenseCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    # 4. Corrected the error message to be relevant to expenses.
    new_expense = create_daily_expense(db=db, expense=expense, user_id=token_data.id)
    if not new_expense:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not create the expense.")
    return new_expense


# 5. This is your correct and primary pagination endpoint for listing items.
@router.get("/", response_model=List[DailyExpenseOut])
def list_daily_expenses(
    db: Session = Depends(get_db),
    token_data: UserOut = Depends(verify_token),
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=1, le=100, description="Number of items per page")
):
    """
    Retrieve a paginated list of daily expenses for the current user.
    """
    expenses = get_daily_expenses(db, user_id=token_data.id, page=page, size=size)
    return expenses


# 6. Added a proper endpoint to get a SINGLE expense by its ID.
@router.get("/{expense_id}", response_model=DailyExpenseOut)
def read_one_expense(expense_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    expense = get_one_daily_expense(db, expense_id=expense_id, user_id=token_data.id)
    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Expense with id: {expense_id} not found")
    return expense


# 7. Corrected the response model to use DailyExpenseOut.
@router.put("/{expense_id}", response_model=DailyExpenseOut)
def update_expense(expense_id: int, expense_update: DailyExpenseUpdate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    updated_expense = update_daily_expense(db, expense_id, expense_update, token_data.id)
    if not updated_expense:
        raise HTTPException(status_code=404, detail="Expense not found or unauthorized")
    return updated_expense


# 8. Corrected the response model to use DailyExpenseOut.
@router.delete("/{expense_id}", response_model=DailyExpenseOut)
def remove_expense(expense_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    deleted_expense = delete_daily_expense(db, expense_id, token_data.id)
    if not deleted_expense:
        raise HTTPException(status_code=404, detail="Expense not found or unauthorized")
    return deleted_expense