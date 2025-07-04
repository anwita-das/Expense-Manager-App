from sqlalchemy import Column, Integer, String ,DateTime, ForeignKey
from sqlalchemy.sql import func
from db.session import Base
from sqlalchemy.sql import func


class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)
    name = Column(String, index=True)
    description = Column(String)
    type = Column(String)
<<<<<<< HEAD
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
=======
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
>>>>>>> origin/frontend
