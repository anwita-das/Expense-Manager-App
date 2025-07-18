from sqlalchemy.orm import Session
from models.book import Book
from schemas.book import BookCreate, BookUpdate
import models

def create_book(db: Session, book: BookCreate, user_id: int):
    db_book = Book(
        title=book.title, 
        description=book.description, 
        type=book.type,
<<<<<<< HEAD
        user_id=user_id
=======
        user_id=user_id 
>>>>>>> 5e420fb225ca9a6473e5f887847f623d6d18d347
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_books(db: Session, skip: int = 0, limit: int = 10, user_id: int = 0):
<<<<<<< HEAD
    return db.query(Book).filter(Book.user_id == user_id).offset(skip).limit(limit).all()

=======

    return db.query(Book).filter(Book.user_id == user_id).offset(skip).limit(limit).all()


>>>>>>> 5e420fb225ca9a6473e5f887847f623d6d18d347
def get_book_by_id(db: Session, book_id: int, user_id: int):
    """
    Retrieves a single book by its ID, but only if it belongs to the specified user.
    This is a crucial security check.
    """
<<<<<<< HEAD
=======

>>>>>>> 5e420fb225ca9a6473e5f887847f623d6d18d347
    return db.query(Book).filter(
        Book.id == book_id, 
        Book.user_id == user_id
    ).first()
<<<<<<< HEAD
=======

>>>>>>> 5e420fb225ca9a6473e5f887847f623d6d18d347

def update_book(db: Session, book_id: int, book: BookUpdate, user_id: int):
    db_book = db.query(Book).filter(Book.id == book_id, Book.user_id == user_id).first()

    if db_book:
        update_data = book.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_book, key, value)

        db.commit()
        db.refresh(db_book)

    return db_book

def delete_book(db: Session, book_id: int, user_id: int):
    db_book = db.query(Book).filter(Book.id == book_id, Book.user_id == user_id).first()

    if db_book:
        db.delete(db_book)
        db.commit()
        return db_book

    return None
