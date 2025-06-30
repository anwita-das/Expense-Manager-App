from sqlalchemy.orm import Session
from models.loan_entries import LoanEntry
from schemas.loan_entries import LoanEntryCreate

def create_loan_entry(db: Session, entry: LoanEntryCreate):
    db_loan_entry = LoanEntry(
        book_id=entry.book_id,
        entry_type=entry.entry_type,
        amount=entry.amount,
        description=entry.description,
        date=entry.date  
    )

    db.add(db_loan_entry)
    db.commit()
    db.refresh(db_loan_entry)
    return db_loan_entry

def get_loan_entries(db: Session, book_id: int, skip: int = 0, limit: int = 10):
    return db.query(LoanEntry).filter(LoanEntry.book_id == book_id).offset(skip).limit(limit).all()