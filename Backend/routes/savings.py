from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from schemas.savings import savingsCreate, savings 
from services.savings_services import create_savings, get_savings
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