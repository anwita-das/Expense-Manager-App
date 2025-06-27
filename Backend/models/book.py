from sqlalchemy import Column, Integer, String ,DateTime
from db.session import Base

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    title = Column(String, index=True)
    description = Column(String)
    type = Column(String)
    created_at = Column(DateTime)
