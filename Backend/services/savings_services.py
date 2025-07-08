from sqlalchemy.orm import Session
from models.savings import savings  
from models.book import Book
from schemas.savings import savingsCreate, savingsUpdate 


def create_savings(db: Session, entry: savingsCreate, user_id: int):
    db_savings = savings(
        book_id=entry.book_id,
        saving_type=entry.saving_type,
        amount=entry.amount,
        description=entry.description,
        date=entry.date,
        frequency=entry.frequency,
        interest_rate=entry.interest_rate  
    )
    db.add(db_savings)
    db.commit()
    db.refresh(db_savings)
    return db_savings


def get_savings(db: Session, book_id: int, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(savings).join(Book).filter(
        savings.book_id == book_id,
        Book.user_id == user_id
    ).offset(skip).limit(limit).all()

def get_savings_by_id(db: Session, savings_id: int, user_id: int):
    return db.query(savings).join(Book).filter(
        savings.id == savings_id,
        Book.user_id == user_id
    ).first()

def update_savings(db: Session, saving_id: int, entry: savingsUpdate, user_id: int):
    db_entry = db.query(savings).join(Book).filter(
        savings.id == saving_id,
        Book.user_id == user_id
    ).first()

    if db_entry:
        update_data = entry.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_entry, key, value)

        db.commit()
        db.refresh(db_entry)

    return db_entry

def delete_savings(db: Session, saving_id: int, user_id: int):
    db_entry = db.query(savings).join(Book).filter(
        savings.id == saving_id,
        Book.user_id == user_id
    ).first()

    if db_entry:
        db.delete(db_entry)
        db.commit()
        return True

    return False