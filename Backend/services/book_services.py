<<<<<<< HEAD
=======
# FILE: services/book_services.py
# CHANGES WERE MADE HERE

>>>>>>> 38ed754f318163cb1cdb9bbd46b72c61b1bd1f4f
from sqlalchemy.orm import Session
from models.book import Book
from schemas.book import BookCreate, BookUpdate
import models

def create_book(db: Session, book: BookCreate, user_id: int):
    db_book = Book(
<<<<<<< HEAD
        title=book.title, 
        description=book.description, 
        type=book.type,
        user_id=user_id
=======
        title=book.title,
        description=book.description,
        type=book.type,
        user_id=user_id # Corrected from owner_id to match your model
>>>>>>> 38ed754f318163cb1cdb9bbd46b72c61b1bd1f4f
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_books(db: Session, skip: int = 0, limit: int = 10, user_id: int = 0):
<<<<<<< HEAD
    return db.query(Book).filter(Book.user_id == user_id).offset(skip).limit(limit).all()

=======
    # FIXED: Removed the extra code that was outside the function
    return db.query(Book).filter(Book.user_id == user_id).offset(skip).limit(limit).all()

# --- THIS IS THE FIXED SECTION ---
>>>>>>> 38ed754f318163cb1cdb9bbd46b72c61b1bd1f4f
def get_book_by_id(db: Session, book_id: int, user_id: int):
    """
    Retrieves a single book by its ID, but only if it belongs to the specified user.
    This is a crucial security check.
    """
<<<<<<< HEAD
    return db.query(Book).filter(
        Book.id == book_id, 
        Book.user_id == user_id
    ).first()
=======
    # FIXED: Wrapped the logic in a proper function definition
    return db.query(Book).filter(
        Book.id == book_id,
        Book.user_id == user_id
    ).first()
# --- END OF FIX ---
>>>>>>> 38ed754f318163cb1cdb9bbd46b72c61b1bd1f4f

def update_book(db: Session, book_id: int, book: BookUpdate, user_id: int):
    db_book = db.query(Book).filter(Book.id == book_id, Book.user_id == user_id).first()

    if db_book:
<<<<<<< HEAD

        update_data = book.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_book, key, value)
        
=======
        update_data = book.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_book, key, value)

>>>>>>> 38ed754f318163cb1cdb9bbd46b72c61b1bd1f4f
        db.commit()
        db.refresh(db_book)

    return db_book

def delete_book(db: Session, book_id: int, user_id: int):
    db_book = db.query(Book).filter(Book.id == book_id, Book.user_id == user_id).first()

    if db_book:
        db.delete(db_book)
        db.commit()
<<<<<<< HEAD
        return db_book  
    
    return None 
=======
        return db_book

    return None
>>>>>>> 38ed754f318163cb1cdb9bbd46b72c61b1bd1f4f
