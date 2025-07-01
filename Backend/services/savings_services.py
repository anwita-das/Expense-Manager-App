from sqlalchemy.orm import Session
from models.savings import savings  
from schemas.savings import savingsCreate, savingsUpdate 


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


def update_savings(db: Session, saving_id: int, entry: savingsUpdate):

    db_saving = db.query(savings).filter(savings.id == saving_id).first()


    if db_saving:
        if entry.saving_type is not None:
            db_saving.saving_type = entry.saving_type
        if entry.amount is not None:
            db_saving.amount = entry.amount
        if entry.description is not None:
            db_saving.description = entry.description
        if entry.date is not None:
            db_saving.date = entry.date
        if entry.frequency is not None:
            db_saving.frequency = entry.frequency
        if entry.interest_rate is not None:
            db_saving.interest_rate = entry.interest_rate
        
        db.commit()
        db.refresh(db_saving)

    return db_saving


def delete_savings(db: Session, saving_id: int):

    db_saving = db.query(savings).filter(savings.id == saving_id).first()


    if db_saving:
        db.delete(db_saving)
        db.commit()
        return True 
    
    return False 