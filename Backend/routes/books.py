from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.book import BookCreate, BookOut
from services.book_services import create_book, get_books
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

router = APIRouter()


@router.post("/create", response_model=BookOut)
def add_book(book: BookCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    print("token_Data",token_data)
    book.user_id = token_data.id
    return create_book(db, book)

@router.get("/", response_model=list[BookOut])
def read_books(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    print("token_Data",token_data.id)
    user_id = token_data.id
    books = get_books(db, skip=skip, limit=limit, user_id=user_id)
    return books