from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

# Import your schemas, services, and dependencies
from schemas.loan_entries import LoanEntryCreate, LoanEntry, LoanEntryUpdate, LoanSummary
from services.loan_entries_services import (
    create_loan_entry, 
    get_loan_entries, 
    update_loan_entry, 
    delete_loan_entry, 
    get_loan_by_id,
    get_loan_summary
)
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

router = APIRouter()

@router.post("/create", response_model=LoanEntry)
def add_loan_entry(entry: LoanEntryCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    # UPDATED: Added detailed error handling to match the expenses router
    new_entry = create_loan_entry(db=db, entry=entry, user_id=token_data.id)
    if not new_entry:
        raise HTTPException(status_code=404, detail="Book not found or you are not authorized to add loans to it")
    return new_entry

@router.get("/entry/{id}", response_model=LoanEntry)
def fetch_loan_by_id(id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    loan_entry = get_loan_by_id(db, id, token_data.id)
    if not loan_entry:
        raise HTTPException(status_code=404, detail="Loan entry not found or unauthorized")
    return loan_entry

@router.get("/{book_id}", response_model=List[LoanEntry])
def read_loan_entries(
    book_id: int,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    token_data: UserOut = Depends(verify_token),
    # UPDATED: Added search and category query parameters
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None)
):
    entries = get_loan_entries(
        db,
        book_id=book_id,
        user_id=token_data.id,
        skip=skip,
        limit=limit,
        search=search,
        category=category
    )
    return entries

@router.put("/{loan_id}", response_model=LoanEntry)
def update_loan(loan_id: int, loan_update: LoanEntryUpdate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    updated_loan = update_loan_entry(db, loan_id, loan_update, token_data.id)
    if not updated_loan:
        raise HTTPException(status_code=404, detail="Loan Entry not found or unauthorized")
    return updated_loan

@router.delete("/{entry_id}")
def delete_loan(entry_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    deleted = delete_loan_entry(db, entry_id, token_data.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Loan entry not found or unauthorized")
    # This now returns the success message from the service, which is good practice
    return deleted

# NEW: Added the summary endpoint, identical in structure to the expenses one
@router.get("/{book_id}/summary", response_model=LoanSummary)
def read_loan_summary(
    book_id: int, 
    db: Session = Depends(get_db), 
    token_data: UserOut = Depends(verify_token)
):
    """
    Get a summary of total loans taken, total loans given,
    and the final balance for a specific book.
    """
    summary_data = get_loan_summary(db=db, book_id=book_id, user_id=token_data.id)
    
    if summary_data is None:
        raise HTTPException(
            status_code=404, 
            detail=f"Book with id {book_id} not found or you are not authorized to view it."
        )
        
    return summary_data