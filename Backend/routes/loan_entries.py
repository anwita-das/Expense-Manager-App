from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from schemas.loan_entries import LoanEntryCreate, LoanEntry, LoanEntryUpdate  
from services.loan_entries_services import create_loan_entry, get_loan_entries, update_loan_entry, delete_loan_entry, get_loan_by_id # Import update and delete
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

router = APIRouter()


@router.post("/create", response_model=LoanEntry)
def add_loan_entry(entry: LoanEntryCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    return create_loan_entry(db=db, entry=entry, user_id=token_data.id)

@router.get("/entry/{id}", response_model=LoanEntry)
def fetch_loan_by_id(id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    return get_loan_by_id(db, id, token_data.id)

@router.get("/{book_id}", response_model=List[LoanEntry])
def read_loan_entries(book_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):

    entries = get_loan_entries(db, book_id=book_id, user_id=token_data.id, skip=skip, limit=limit)
    return entries

@router.put("/{loan_id}", response_model=LoanEntry)
def update_loan(loan_id: int, loan_update: LoanEntryUpdate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    updated_loan = update_loan_entry(db, loan_id, loan_update, token_data.id)
    if not updated_loan:
        raise HTTPException(status_code=404, detail="Loan Entry not found or unauthorized")
    return updated_loan


@router.delete("/{entry_id}")
def delete_loan(entry_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    # You must pass the user's ID to the service function
    success = delete_loan_entry(db, entry_id, token_data.id)
    if not success:
        raise HTTPException(status_code=404, detail="Loan entry not found or unauthorized")
    return {"detail": "Loan entry deleted successfully"}