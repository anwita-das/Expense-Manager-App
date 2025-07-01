from sqlalchemy.orm import Session
from models.savings import savings
from schemas.savings import savingsCreate

def create_savings(db: Session, entry: savingsCreate):
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

def get_savings(db: Session, book_id: int, skip: int = 0, limit: int = 10):
    return db.query(savings).filter(savings.book_id == book_id).offset(skip).limit(limit).all()