from sqlalchemy.orm import Session
from models.daily_expense import DailyExpense
from models.book import Book
from schemas.daily_expense import DailyExpenseCreate, DailyExpenseUpdate
from typing import Optional
import models
from sqlalchemy import func, case
from decimal import Decimal

def create_daily_expense(db: Session, expense: DailyExpenseCreate, user_id: int):

    book = db.query(Book).filter(Book.id == expense.book_id, Book.user_id == user_id).first()
    if not book:
        return None

    db_expense = DailyExpense(
        book_id=expense.book_id,
        type=expense.type,
        amount=expense.amount,
        description=expense.description,
        datetime=expense.datetime,
        category=expense.category,
        payment_method=expense.payment_method
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def get_daily_expenses(db: Session, book_id: int, user_id: int, skip: int = 0, limit: int = 10, search: Optional[str] = None, category: Optional[str] = None, type: Optional[str] = None, payment_method: Optional[str] = None):
    query = db.query(DailyExpense).join(Book).filter(
        DailyExpense.book_id == book_id,
        Book.user_id == user_id
    )

    if search:
        query = query.filter(models.DailyExpense.description.ilike(f"%{search}%"))

    if type:
        query = query.filter(DailyExpense.type == type)

    if category:
        query = query.filter(models.DailyExpense.category == category)

    if payment_method:
        query = query.filter(DailyExpense.payment_method == payment_method)

    expenses = query.order_by(DailyExpense.datetime.desc()).offset(skip).limit(limit).all()

    return expenses


def get_expense_by_id(db: Session, expense_id: int, user_id: int):
    return db.query(DailyExpense).join(Book).filter(
        DailyExpense.id == expense_id,
        Book.user_id == user_id
    ).first()

def update_daily_expense(db: Session, expense_id: int, expense: DailyExpenseUpdate, user_id: int):

    db_expense = db.query(DailyExpense).join(Book).filter(
        DailyExpense.id == expense_id,
        Book.user_id == user_id
    ).first()

    if db_expense:
        update_data = expense.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_expense, key, value)

        db.commit()
        db.refresh(db_expense)

    return db_expense


def delete_daily_expense(db: Session, expense_id: int, user_id: int):
    db_expense = db.query(DailyExpense).join(Book).filter(
        DailyExpense.id == expense_id,
        Book.user_id == user_id
    ).first()

    if db_expense:
        db.delete(db_expense)
        db.commit()
        return db_expense

    return None



def get_expense_summary(db: Session, book_id: int, user_id: int, search: Optional[str] = None, category: Optional[str] = None, type: Optional[str] = None, payment_method: Optional[str] = None):
    """
    Calculates the summary of expenses for a specific book owned by the user.
    """
    # First, verify that the book exists and belongs to the user for authorization
    book = db.query(Book).filter(Book.id == book_id, Book.user_id == user_id).first()
    if not book:
        # Return None to indicate the book was not found or the user is not authorized
        return None

    # Use a single query to get the sum of credits and debits
    # 'case' works like an IF statement in SQL.
    # We sum the amount if the type is 'credit', otherwise we sum 0.
    # We do the same for 'debit'.
    query = db.query(
        func.sum(case((DailyExpense.type == 'cashin', DailyExpense.amount), else_=0)).label('total_earning'),
        func.sum(case((DailyExpense.type == 'cashout', DailyExpense.amount), else_=0)).label('total_spending')
    ).join(Book).filter(
        DailyExpense.book_id == book_id,
        Book.user_id == user_id
    )

    if search:
        query = query.filter(DailyExpense.description.ilike(f"%{search}%"))
    if category:
        query = query.filter(DailyExpense.category == category)
    if type:
        query = query.filter(DailyExpense.type == type)
    if payment_method:
        query = query.filter(DailyExpense.payment_method == payment_method)

    # Execute the query
    result = query.one()

    # The result might contain None if there are no entries, so default to 0.0
    total_earning = float(result.total_earning or 0.0)
    total_spending = float(result.total_spending or 0.0)
    balance = total_earning - total_spending

    return {
        "total_earning": total_earning,
        "total_spending": total_spending,
        "balance": balance
    }
