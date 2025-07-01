from sqlalchemy import Column, Integer, String, DateTime, ForeignKey ,DECIMAL 
from db.session import Base



class DailyExpense(Base):
    __tablename__ = "daily_expenses"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id")) 
    type = Column(String(255))
    amount = Column(DECIMAL(10, 2)) 
    description = Column(String(255), nullable=True)
    datetime = Column(DateTime)
    category = Column(String(100))
    payment_method = Column(String(100))