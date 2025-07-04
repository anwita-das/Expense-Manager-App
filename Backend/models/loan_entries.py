# In models/loan_entries.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from db.session import Base

class LoanEntry(Base):
    __tablename__ = 'loan_entries'

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey('books.id'))
    
    # <<< ADD THIS LINE
    user_id = Column(Integer, ForeignKey('users.id')) # Assumes your users table is named 'users'
    
    entry_type = Column(String)
    amount = Column(Float)
    description = Column(String)
    date = Column(DateTime)