from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from schemas.daily_expense import DailyExpenseCreate, DailyExpense, DailyExpenseUpdate
from services import daily_expense_services
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

router = APIRouter(prefix="/daily-expenses", tags=["Daily Expenses"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=DailyExpense)
def add_daily_expense(
    expense: DailyExpenseCreate,
    db: Session = Depends(get_db),
    token_data: UserOut = Depends(verify_token),
):
    """Adds a new daily expense."""
    new_expense = daily_expense_services.create_daily_expense(
        db=db, expense=expense, user_id=token_data.id
    )
    if not new_expense:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not create the expense.",
        )
    return new_expense


@router.get("/", response_model=List[DailyExpense])
def list_daily_expenses(
    db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)
):
    """Retrieves all daily expenses for the current user."""
    expenses = daily_expense_services.get_daily_expenses(db, user_id=token_data.id)
    return expenses


@router.get("/{expense_id}", response_model=DailyExpense)
def read_one_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    token_data: UserOut = Depends(verify_token),
):
    """Retrieves a single expense by ID."""
    expense = daily_expense_services.get_one_daily_expense(
        db, expense_id=expense_id, user_id=token_data.id
    )
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Expense with id: {expense_id} not found",
        )
    return expense


@router.put("/{expense_id}", response_model=DailyExpense)
def update_expense(
    expense_id: int,
    expense_update: DailyExpenseUpdate,
    db: Session = Depends(get_db),
    token_data: UserOut = Depends(verify_token),
):
    """Updates an existing expense."""
    updated_expense = daily_expense_services.update_daily_expense(
        db, expense_id, expense_update, token_data.id
    )
    if not updated_expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found or unauthorized",
        )
    return updated_expense


@router.delete("/{expense_id}", response_model=DailyExpense)
def remove_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    token_data: UserOut = Depends(verify_token),
):
    """Deletes an expense."""
    deleted_expense = daily_expense_services.delete_daily_expense(
        db, expense_id, token_data.id
    )
    if not deleted_expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found or unauthorized",
        )
    return deleted_expense