from sqlalchemy import Column, Integer, String ,DateTime, ForeignKey
from db.session import Base

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)
    title = Column(String, index=True)
    description = Column(String)
    type = Column(String)
    created_at = Column(DateTime)
