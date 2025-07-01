from sqlalchemy import Column, Integer, String ,DateTime, ForeignKey
from sqlalchemy.sql import func
from db.session import Base

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)
    name = Column(String, index=True)
    description = Column(String)
    type = Column(String)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())