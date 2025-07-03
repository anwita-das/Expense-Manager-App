from sqlalchemy.orm import Session
from models.loan_entries import LoanEntry
from schemas.loan_entries import LoanEntryCreate, LoanEntryUpdate

# --- CREATE ---
# FIXED: Added 'user_id' to associate the new entry with the current user.
def create_loan_entry(db: Session, entry: LoanEntryCreate, user_id: int):
    """
    Creates a new loan entry in the database for the specified user.
    """
    db_loan_entry = LoanEntry(
        book_id=entry.book_id,
        user_id=user_id,  # <-- IMPORTANT SECURITY FIX
        entry_type=entry.entry_type,
        amount=entry.amount,
        description=entry.description,
        date=entry.date  
    )
    db.add(db_loan_entry)
    db.commit()
    db.refresh(db_loan_entry)
    return db_loan_entry


# --- READ ---
# FIXED: Added 'user_id' to ensure a user can only get entries they own.
def get_loan_entries(db: Session, book_id: int, user_id: int, skip: int = 0, limit: int = 10):
    """
    Gets a paginated list of loan entries for a specific book owned by the user.
    """
    # This query now ensures the book entries belong to the requesting user.
    return db.query(LoanEntry).filter(
        LoanEntry.book_id == book_id, 
        LoanEntry.user_id == user_id  # <-- IMPORTANT SECURITY FIX
    ).offset(skip).limit(limit).all()


# --- UPDATE ---
def update_loan_entry(db: Session, loan_id: int, loan_update: LoanEntryUpdate, user_id: int):
    """
    Updates a loan entry, ensuring it is owned by the user.
    """
    # FIXED: Find the entry by its ID AND verify ownership with user_id.
    db_entry = db.query(LoanEntry).filter(
        LoanEntry.id == loan_id,
        LoanEntry.user_id == user_id  # <-- IMPORTANT SECURITY FIX
    ).first()

    # If the entry exists and the user is authorized...
    if db_entry:
        # FIXED: Get update data from the correct 'loan_update' parameter.
        update_data = loan_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_entry, key, value)
        
        db.commit()
        db.refresh(db_entry)

    return db_entry


# --- DELETE ---
# FIXED: Added 'user_id' to ensure a user can only delete their own entries.
def delete_loan_entry(db: Session, entry_id: int, user_id: int):
    """
    Deletes a loan entry, ensuring it is owned by the user.
    """
    # FIXED: Find the entry by its ID AND verify ownership with user_id.
    db_entry = db.query(LoanEntry).filter(
        LoanEntry.id == entry_id,
        LoanEntry.user_id == user_id  # <-- IMPORTANT SECURITY FIX
    ).first()

    if db_entry:
        db.delete(db_entry)
        db.commit()
        return True # Indicates success

    return False # Indicates failure (not found or not authorized)