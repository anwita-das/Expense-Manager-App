from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, DECIMAL
from db.session import Base

class savings(Base):
    __tablename__="savings"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id")) 
    saving_type = Column(String(255))
    amount = Column(DECIMAL(10, 2))
    description = Column(String(255), nullable=True) 
    date = Column(DateTime)    
    frequency = Column(String(100), nullable=True)
    interest_rate = Column(DECIMAL(10, 2))