# In services/daily_expense_services.py

from sqlalchemy.orm import Session
from models.daily_expense import DailyExpense
from models.book import Book  
from schemas.daily_expense import DailyExpenseCreate, DailyExpenseUpdate


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

def get_daily_expenses(db: Session, user_id: int, page: int, size: int):
    """
    Gets a paginated list of daily expenses for a specific user.
    """
    offset = (page - 1) * size

    # The query is almost identical to the one for categories,
    # just with a different model and ordering.
    expenses = (
        db.query(DailyExpense)
        .filter(DailyExpense.user_id == user_id)
        .order_by(DailyExpense.date.desc()) # Order by date, newest first
        .offset(offset)
        .limit(size)
        .all()
    )
    return expenses


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