from sqlalchemy.orm import Session
from models.loan_entries import LoanEntry
from schemas.loan_entries import LoanEntryCreate, LoanEntryUpdate # <-- Import LoanEntryUpdate


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


def update_loan_entry(db: Session, entry_id: int, entry: LoanEntryUpdate):

    db_entry = db.query(LoanEntry).filter(LoanEntry.id == entry_id).first()


    if db_entry:
        if entry.entry_type is not None:
            db_entry.entry_type = entry.entry_type
        if entry.amount is not None:
            db_entry.amount = entry.amount
        if entry.description is not None:
            db_entry.description = entry.description
        if entry.date is not None:
            db_entry.date = entry.date
        
        db.commit()
        db.refresh(db_entry)

    return db_entry

def delete_loan_entry(db: Session, entry_id: int):

    db_entry = db.query(LoanEntry).filter(LoanEntry.id == entry_id).first()


    if db_entry:
        db.delete(db_entry)
        db.commit()
        return True
    

    return False