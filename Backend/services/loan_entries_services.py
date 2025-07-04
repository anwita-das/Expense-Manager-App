# In services/loan_entry_services.py

from sqlalchemy.orm import Session
from models.loan_entries import LoanEntry
from models.book import Book
from schemas.loan_entries import LoanEntryCreate, LoanEntryUpdate

# --- CREATE ---
def create_loan_entry(db: Session, entry: LoanEntryCreate, user_id: int):
    """
    Creates a new loan entry in the database for a book owned by the user.
    """
    book = db.query(Book).filter(Book.id == entry.book_id, Book.user_id == user_id).first()
    if not book:
        return None  # Prevent creating entry for someone else's book

    db_loan_entry = LoanEntry(
        book_id=entry.book_id,
        entry_type=entry.entry_type,
        amount=entry.amount,
        description=entry.description,
        date=entry.date,
        category=entry.category
    )
    db.add(db_loan_entry)
    db.commit()
    db.refresh(db_loan_entry)
    return db_loan_entry


# --- READ ---
def get_loan_entries(db: Session, book_id: int, user_id: int, skip: int = 0, limit: int = 10):
    """
    Gets a paginated list of loan entries for a specific book owned by the user.
    """
    return db.query(LoanEntry).join(Book).filter(
        LoanEntry.book_id == book_id,
        Book.user_id == user_id
    ).offset(skip).limit(limit).all()


# --- UPDATE ---
def update_loan_entry(db: Session, loan_id: int, loan_update: LoanEntryUpdate, user_id: int):
    """
    Updates a loan entry, ensuring it is owned by the user (through the book).
    """
    db_entry = db.query(LoanEntry).join(Book).filter(
        LoanEntry.id == loan_id,
        Book.user_id == user_id
    ).first()

    if db_entry:
        update_data = loan_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_entry, key, value)

        db.commit()
        db.refresh(db_entry)

    return db_entry


# --- DELETE ---
def delete_loan_entry(db: Session, entry_id: int, user_id: int):
    """
    Deletes a loan entry, ensuring it is owned by the user (through the book).
    """
    db_entry = db.query(LoanEntry).join(Book).filter(
        LoanEntry.id == entry_id,
        Book.user_id == user_id
    ).first()

    if db_entry:
        db.delete(db_entry)
        db.commit()
        return True

    return False
