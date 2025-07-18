from sqlalchemy.orm import Session
from sqlalchemy import func, case
from typing import Optional
from decimal import Decimal

# Import your models and schemas
import models
from models.loan_entries import LoanEntry
from models.book import Book
from schemas.loan_entries import LoanEntryCreate, LoanEntryUpdate

# --- Private Helper Function for Reusability ---

def _update_book_balance_from_loans(db: Session, book_id: int):
    """
    Recalculates the total balance for a given book based on its loan entries
    and updates the Book.amount.
    - 'loan_taken' is treated as a credit (increases balance).
    - 'loan_given' is treated as a debit (decreases balance).
    This function commits the changes to the database.
    """
    # Use a single, efficient query to get both sums
    summary = db.query(
        func.sum(case((LoanEntry.type == 'loan_taken', LoanEntry.amount), else_=0)).label('total_credit'),
        func.sum(case((LoanEntry.type == 'loan_given', LoanEntry.amount), else_=0)).label('total_debit')
    ).filter(LoanEntry.book_id == book_id).one()

    # Coalesce None to 0
    total_credit = summary.total_credit or Decimal('0.0')
    total_debit = summary.total_debit or Decimal('0.0')

    # Calculate the final balance
    final_balance = total_credit - total_debit

    # Update the book's amount
    db.query(Book).filter(Book.id == book_id).update({"amount": final_balance})


# --- CRUD Service Functions ---

def create_loan_entry(db: Session, entry: LoanEntryCreate, user_id: int):
    """
    Creates a new loan entry and updates the corresponding book's balance.
    """
    # 1. Verify the user owns the book
    if not db.query(Book).filter(Book.id == entry.book_id, Book.user_id == user_id).first():
        return None

    # 2. Create the loan entry
    db_entry = LoanEntry(**entry.model_dump(), user_id=user_id)
    db.add(db_entry)
    
    # 3. Update the book's balance
    # We must commit the new entry first so the query can see it
    db.commit() 
    _update_book_balance_from_loans(db, book_id=entry.book_id)
    
    # 4. Final commit and refresh
    db.commit()
    db.refresh(db_entry)
    
    return db_entry


def get_loan_entries(db: Session, book_id: int, user_id: int, skip: int = 0, limit: int = 10, search: Optional[str] = None, category: Optional[str] = None):
    """
    Retrieves a paginated list of loan entries for a specific book owned by the user,
    with optional search and category filters.
    """
    # This join implicitly ensures the book belongs to the user
    query = db.query(LoanEntry).join(Book).filter(
        LoanEntry.book_id == book_id,
        Book.user_id == user_id
    )

    if search:
        # Assuming LoanEntry has a 'description' field like DailyExpense
        query = query.filter(models.LoanEntry.description.ilike(f"%{search}%"))

    if category:
        # Assuming LoanEntry has a 'category' field
        query = query.filter(models.LoanEntry.category == category)

    entries = query.order_by(LoanEntry.date.desc()).offset(skip).limit(limit).all()
    return entries


def get_loan_by_id(db: Session, loan_id: int, user_id: int):
    """
    Retrieves a single loan entry by its ID, ensuring it belongs to the user.
    """
    return db.query(LoanEntry).join(Book).filter(
        LoanEntry.id == loan_id,
        Book.user_id == user_id
    ).first()


def update_loan_entry(db: Session, loan_id: int, loan_update: LoanEntryUpdate, user_id: int):
    """
    Updates a loan entry and recalculates the book's balance.
    """
    db_entry = get_loan_by_id(db, loan_id, user_id)
    if not db_entry:
        return None

    # Update the entry's data
    for key, value in loan_update.model_dump(exclude_unset=True).items():
        setattr(db_entry, key, value)
    
    # Recalculate and update the book's balance
    _update_book_balance_from_loans(db, book_id=db_entry.book_id)
    
    db.commit()
    db.refresh(db_entry)
    return db_entry


def delete_loan_entry(db: Session, loan_id: int, user_id: int):
    """
    Deletes a loan entry and recalculates the book's balance.
    """
    db_entry = get_loan_by_id(db, loan_id, user_id)
    if not db_entry:
        return None
    
    book_id_to_update = db_entry.book_id
    
    # Delete the object
    db.delete(db_entry)
    
    # Recalculate and update the book's balance
    # Commit the deletion first so the query for balance update is accurate
    db.commit()
    _update_book_balance_from_loans(db, book_id=book_id_to_update)

    db.commit()
    return {"detail": "Loan entry deleted successfully"}


def get_loan_summary(db: Session, book_id: int, user_id: int):
    """
    Provides a summary of total loans taken and given for a specific book.
    """
    # Verify the user owns the book
    book = db.query(Book).filter(Book.id == book_id, Book.user_id == user_id).first()
    if not book:
        return None
    
    # Use the same efficient query as the helper function
    summary_query = db.query(
        func.sum(case((LoanEntry.type == 'loan_taken', LoanEntry.amount), else_=0)).label('total_loan_taken'),
        func.sum(case((LoanEntry.type == 'loan_given', LoanEntry.amount), else_=0)).label('total_loan_given')
    ).filter(LoanEntry.book_id == book_id)

    result = summary_query.one()

    # Safely convert to float or Decimal for the response
    total_loan_taken = result.total_loan_taken or Decimal('0.0')
    total_loan_given = result.total_loan_given or Decimal('0.0')

    balance = total_loan_taken - total_loan_given

    return {
        "total_loan_taken": total_loan_taken,
        "total_loan_given": total_loan_given,
        "balance": balance
    }