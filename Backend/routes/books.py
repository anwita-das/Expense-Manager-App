from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.book import BookCreate, BookOut
from services.book_services import create_book, get_books
from services.auth_services import verify_token
from services.book_services import get_book_by_id
from schemas.user import UserOut
from db.session import get_db

router = APIRouter()


@router.post("/create", response_model=BookOut)
def add_book(book: BookCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    print("token_Data",token_data)
    return create_book(db, book, token_data.id)

@router.get("/", response_model=list[BookOut])
def read_books(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    print("token_Data",token_data.id)
    books = get_books(db, user_id=token_data.id, skip=skip, limit=limit)
    return books

@router.get("/{book_id}", response_model=BookOut)
def read_book(book_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    book = get_book_by_id(db, book_id, token_data.id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book