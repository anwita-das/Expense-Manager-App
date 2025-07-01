from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, DECIMAL
from db.session import Base


class LoanEntry(Base):
    __tablename__ = "loan_entries"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id")) 
    entry_type = Column(String(255))
    amount = Column(DECIMAL(10, 2))
    description = Column(String(255), nullable=True) 
    date = Column(DateTime)