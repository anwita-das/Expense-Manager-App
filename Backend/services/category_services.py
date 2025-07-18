from sqlalchemy.orm import Session
from models.category import Category
from schemas.category import CategoryCreate
from schemas.category import CategoryCreate, CategoryUpdate
import models


def create_category(db: Session, category: CategoryCreate, user_id: int | None = None):
    db_category = Category(name=category.name, user_id=user_id)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_categories(db: Session, user_id: int, page: int, size: int):
    """
    Gets a paginated list of categories for a specific user.
    """
    offset = (page - 1) * size

    categories = (db.query(models.category.Category)
                    .filter(
                        (models.category.Category.user_id == user_id) | 
                        (models.category.Category.user_id == None) 
                    )
                    .offset(offset)
                    .limit(size)
                    .all())
    
    return categories



def delete_category(db: Session, category_id: int, user_id: int):
    category = db.query(Category).filter(Category.id == category_id, Category.user_id == user_id).first()
    if category:
        db.delete(category)
        db.commit()
    return category
def update_category(db: Session, category_id: int, category: CategoryUpdate, user_id: int):
    db_category = db.query(Category).filter(Category.id == category_id, Category.user_id == user_id).first()

    if db_category:
        if category.name is not None:
            db_category.name = category.name
        if category.description is not None:
            db_category.description = category.description
        
        db.commit()
        db.refresh(db_category)

    return db_category