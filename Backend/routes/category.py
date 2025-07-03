# routes/category.py

from fastapi import APIRouter, Depends, HTTPException, status ,Query
from sqlalchemy.orm import Session
from schemas.category import CategoryCreate, CategoryOut, CategoryUpdate
from services.category_services import create_category, get_categories, delete_category, update_category
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db
import models 

router = APIRouter(
    tags=['Categories']
)

@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=CategoryOut)
def add_category(category: CategoryCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    return create_category(db, category, token_data.id)


# This function is already correct. No changes needed here.
@router.get("/", response_model=list[CategoryOut])
def list_categories(
    db: Session = Depends(get_db), 
    token_data: UserOut = Depends(verify_token),
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=1, le=100, description="Number of items per page")
):
    """
    Retrieve a paginated list of categories for the current user.
    """
    return get_categories(db, token_data.id, page=page, size=size)


# <<< MAKE THE CHANGE IN THIS FUNCTION
@router.get("/{id}", response_model=CategoryOut)
def get_one_category(id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):

    # Correct the path to the Category model here
    category = db.query(models.category.Category).filter(models.category.Category.id == id, models.category.Category.user_id == token_data.id).first()
    
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Category with id: {id} not found")
    return category


# This function is correct. No changes needed.
@router.put("/{category_id}", response_model=CategoryOut)
def update_existing_category(category_id: int, category_update: CategoryUpdate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    updated_category = update_category(db, category_id, category_update, token_data.id)
    if not updated_category:
        raise HTTPException(status_code=404, detail="Category not found or unauthorized")
    return updated_category

# This function is correct. No changes needed.
@router.delete("/{category_id}", response_model=CategoryOut)
def remove_category(category_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    deleted = delete_category(db, category_id, token_data.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Category not found or unauthorized")
    return deleted