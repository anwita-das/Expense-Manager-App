from sqlalchemy.orm import Session
from models.loan_entries import LoanEntry
from decimal import Decimal
from typing import Optional
import models
from schemas.loan_entries import LoanEntryCreate, LoanEntryUpdate
from models.book import Book
from sqlalchemy import func, case

def create_loan_entry(db: Session, entry: LoanEntryCreate, user_id: int):
    db_entry = models.LoanEntry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    update_book_loanamount_DE(db, entry.book_id, user_id)
    return db_entry

def get_loan_entries(db: Session, book_id: int, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(LoanEntry).join(Book).filter(
        LoanEntry.book_id == book_id,
        Book.user_id == user_id
    ).offset(skip).limit(limit).all()

def get_loan_by_id(db: Session, loan_id: int, user_id: int):
    return db.query(LoanEntry).join(Book).filter(
        LoanEntry.id == loan_id,
        Book.user_id == user_id
    ).first()

def update_loan_entry(db: Session, loan_id: int, loan_update: LoanEntryUpdate, user_id: int):
    db_entry = db.query(LoanEntry).join(Book).filter(
        LoanEntry.id == loan_id,
        Book.user_id == user_id
    ).first()

    if db_entry:
        book_id_to_update = db_entry.book_id
        update_data = loan_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_entry, key, value)
        db.commit()
        db.refresh(db_entry)
        update_book_loanamount_DE(db, book_id=book_id_to_update, user_id=user_id)

    return db_entry

def delete_loan_entry(db: Session, entry_id: int, user_id: int):
    db_entry = db.query(LoanEntry).join(Book).filter(
        LoanEntry.id == entry_id,
        Book.user_id == user_id
    ).first()

    if db_entry:
        book_id_to_update = db_entry.book_id
        db.delete(db_entry)
        db.commit()
        update_book_loanamount_DE(db, book_id=book_id_to_update, user_id=user_id)
        return True

    return False

def update_book_loanamount_DE(db: Session, book_id: int, user_id: int):
    total_newloan = db.query(func.sum(LoanEntry.amount)).join(Book).filter(
        LoanEntry.book_id == book_id,
        Book.user_id == user_id,
        LoanEntry.entry_type.in_(["newloan", "taking loan"])
    ).scalar() or 0

    total_emipayment = db.query(func.sum(LoanEntry.amount)).join(Book).filter(
        LoanEntry.book_id == book_id,
        Book.user_id == user_id,
        LoanEntry.entry_type.in_(["emipayment", "repayment"])
    ).scalar() or 0

    final_loan_balance = Decimal(total_newloan) - Decimal(total_emipayment)

    db_book = db.query(Book).filter(Book.id == book_id, Book.user_id == user_id).first()

    if db_book and db_book.amount != final_loan_balance:
        db_book.amount = final_loan_balance
        db.commit()
        
    return