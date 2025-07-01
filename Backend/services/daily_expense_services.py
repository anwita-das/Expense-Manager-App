from sqlalchemy.orm import Session
from models.daily_expense import DailyExpense
from schemas.daily_expense import DailyExpenseCreate

def create_daily_expense(db: Session, expense: DailyExpenseCreate):
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

def get_daily_expenses(db: Session, book_id: int, skip: int = 0, limit: int = 10):
    return db.query(DailyExpense).filter(DailyExpense.book_id == book_id).offset(skip).limit(limit).all()