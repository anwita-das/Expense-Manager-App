# In models/loan_entries.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, DECIMAL
from db.session import Base

class LoanEntry(Base):
    __tablename__ = 'loan_entries'

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey('books.id'))
    
    type = Column(String)
    amount = Column(DECIMAL(10, 2))
    description = Column(String)
    date = Column(DateTime)
    category = Column(String(100))