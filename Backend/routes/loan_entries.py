from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from schemas.loan_entries import LoanEntryCreate, LoanEntry 
from services.loan_entries_services import create_loan_entry, get_loan_entries
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

router = APIRouter()


@router.post("/create", response_model=LoanEntry)
def add_loan_entry(entry: LoanEntryCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    # 4. Call the correct service function
    return create_loan_entry(db=db, entry=entry)


@router.get("/{book_id}", response_model=List[LoanEntry])
def read_loan_entries(book_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    
    entries = get_loan_entries(db, book_id=book_id, skip=skip, limit=limit)
    return entries