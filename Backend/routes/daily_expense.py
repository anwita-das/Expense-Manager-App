from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from schemas.daily_expense import DailyExpenseCreate, DailyExpense, DailyExpenseUpdate
from services.daily_expense_services import create_daily_expense, get_daily_expenses, update_daily_expense, delete_daily_expense, get_expense_by_id
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db
from schemas.daily_expense import ExpenseSummary 
from services.daily_expense_services import get_expense_summary

router = APIRouter()

@router.post("/create", response_model=DailyExpense)
def add_daily_expense(expense: DailyExpenseCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    new_expense = create_daily_expense(db=db, expense=expense, user_id=token_data.id)

    if not new_expense:
        raise HTTPException(status_code=404, detail="Book not found or you are not authorized to add expenses to it")
    return new_expense

@router.get("/entry/{id}", response_model=DailyExpense)
def fetch_expense_by_id(id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    return get_expense_by_id(db, id, token_data.id)



@router.get("/{book_id}", response_model=List[DailyExpense])
def read_daily_expenses(
    book_id: int,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    token_data: UserOut = Depends(verify_token),
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    payment_method: Optional[str] = Query(None)
):
    # print("testing")
    # print(f"search: {search}")
    # print(f"category: {category}")
    # print(f"skip: {skip}")
    # print(f"limit: {limit}")

    expenses = get_daily_expenses(
        db,
        book_id=book_id,
        user_id=token_data.id,
        skip=skip,
        limit=limit,
        search=search,
        category=category,
        type=type,
        payment_method=payment_method
    )
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


@router.get("/{book_id}/summary", response_model=ExpenseSummary)
def read_expense_summary(
    book_id: int, 
    db: Session = Depends(get_db), 
    token_data: UserOut = Depends(verify_token),
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    payment_method: Optional[str] = Query(None),
):
    """
    Get a summary of total earnings (credit), total spending (debit),
    and the final balance for a specific book.
    """
    summary_data = get_expense_summary(db=db, book_id=book_id, user_id=token_data.id, search=search, category=category, type=type, payment_method=payment_method)
    
    if summary_data is None:
        raise HTTPException(
            status_code=404, 
            detail=f"Book with id {book_id} not found or you are not authorized to view it."
        )
        
    return summary_data