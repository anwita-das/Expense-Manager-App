from sqlalchemy.orm import Session
from models.book import Book
from schemas.book import BookCreate
from models.book import Book
from sqlalchemy.orm import Session

def create_book(db: Session, book: BookCreate):
    db_book = Book(
        name=book.name, 
        description=book.description, 
        type=book.type,
        user_id = user_id)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_books(db: Session, skip: int = 0, limit: int = 10, user_id: int = 0):
    print(user_id)
    return db.query(Book).filter(Book.user_id == user_id).offset(skip).limit(limit).all()

def get_book_by_id(db: Session, book_id: int, user_id: int):
    return db.query(Book).filter(Book.id == book_id, Book.user_id == user_id).first()