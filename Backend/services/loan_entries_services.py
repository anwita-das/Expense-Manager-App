from sqlalchemy.orm import Session
from models.loan_entries import LoanEntry
from decimal import Decimal
from typing import Optional
import models
from schemas.loan_entries import LoanEntryCreate, LoanEntryUpdate 
from models.book import Book
from sqlalchemy import func, case
from models.loan_entries import LoanEntry



# FIX 1: The type hint for 'entry' was changed from 'schemas.LoanEntryCreate' to just 'LoanEntryCreate'.
def create_loan_entry(db: Session, entry: LoanEntryCreate, user_id: int): 
    db_entry = models.LoanEntry(**entry.model_dump())
    db_entry.user_id = user_id 
    db.add(db_entry)
    update_book_loanamount_DE(db, entry.book_id)
    db.commit()
    db.refresh(db_entry)
    return db_entry

    


def get_loan_entries(db: Session, book_id: int, user_id: int, skip: int = 0, limit: int = 10): 
    return db.query(models.LoanEntry).filter(
        models.LoanEntry.book_id == book_id,
        models.LoanEntry.user_id == user_id 
    ).offset(skip).limit(limit).all()


# FIX 2: This entire function was added to resolve the "cannot import name 'get_loan_by_id'" error.
def get_loan_by_id(db: Session, loan_id: int, user_id: int):
    """
    Retrieves a single loan entry by its ID, ensuring it is owned by the user.
    """
    return db.query(LoanEntry).filter(
        LoanEntry.id == loan_id,
        LoanEntry.user_id == user_id
    ).first()


def update_loan_entry(db: Session, loan_id: int, loan_update: LoanEntryUpdate, user_id: int):
    """
    Updates a loan entry, ensuring it is owned by the user.
    """
    db_entry = db.query(LoanEntry).filter(
        LoanEntry.id == loan_id,
        LoanEntry.user_id == user_id  
    ).first()

    if db_entry:
        update_data = loan_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_entry, key, value)
        
        db.commit()
        db.refresh(db_entry)

    return db_entry


def delete_loan_entry(db: Session, entry_id: int, user_id: int):
    """
    Deletes a loan entry, ensuring it is owned by the user.
    """
    db_entry = db.query(LoanEntry).filter(
        LoanEntry.id == entry_id,
        LoanEntry.user_id == user_id  
    ).first()

    if db_entry:
        db.delete(db_entry)
        db.commit()
        return True 

    return False


def update_book_loanamount_DE(db: Session, book_id: int):
    print(f"book_id: {book_id}")
    total_credit = db.query(func.sum(LoanEntry.amount)).filter(
    LoanEntry.book_id == book_id,
    LoanEntry.type.in_(["credit", "taking loan"])  
    ).scalar()
    print(f"total_credit: {total_credit}")

    total_debit = db.query(func.sum(LoanEntry.amount)).filter(
    LoanEntry.book_id == book_id,
    LoanEntry.type.in_(["debit", "repayment"])  
    ).scalar()
    print(f"total_debit: {total_debit}")

    if total_credit is None:
        total_credit = 0
    
    if total_debit is None:
        total_debit = 0

    final_loan_balance = total_credit - total_debit
    print(f"final_loan_balance: {final_loan_balance}")
    
    db_book = db.query(Book).filter(Book.id == book_id).first()

    if db_book:
        db_book.amount = final_loan_balance  
        db.commit()  

    print(f"db_book: {db_book}")
