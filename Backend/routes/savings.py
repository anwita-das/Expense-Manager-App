from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from schemas.savings import savingsCreate, savings, savingsUpdate  # Import savingsUpdate
from services.savings_services import create_savings, get_savings, update_savings, delete_savings # Import update and delete
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

router = APIRouter()


@router.post("/create", response_model=savings)
def add_savings(entry: savingsCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    return create_savings(db=db, entry=entry)


@router.get("/{book_id}", response_model=List[savings])
def read_savings(book_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):

    entries = get_savings(db, book_id=book_id, skip=skip, limit=limit)
    return entries

@router.put("/{saving_id}", response_model=savings)
def update_saving(saving_id: int, saving_update: savingsUpdate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    updated_saving = update_savings(db, saving_id, saving_update, token_data.id)
    if not updated_saving:
        raise HTTPException(status_code=404, detail="Saving entry not found or unauthorized")
    return updated_saving

@router.delete("/{saving_id}", response_model=savings)
def remove_saving(saving_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    deleted = delete_savings(db, saving_id, token_data.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Saving entry not found or unauthorized")
    return deleted