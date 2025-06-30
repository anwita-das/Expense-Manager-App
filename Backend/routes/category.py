from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.category import CategoryCreate, CategoryOut, CategoryUpdate # Import CategoryUpdate
from services.category_services import create_category, get_categories, delete_category, update_category # Import update_category
from services.auth_services import verify_token
from schemas.user import UserOut
from db.session import get_db

router = APIRouter()

@router.post("/create", response_model=CategoryOut)
def add_category(category: CategoryCreate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    return create_category(db, category, token_data.id)

@router.get("/", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    return get_categories(db, token_data.id)

@router.put("/{category_id}", response_model=CategoryOut)
def update_existing_category(category_id: int, category_update: CategoryUpdate, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    updated_category = update_category(db, category_id, category_update, token_data.id)
    if not updated_category:
        raise HTTPException(status_code=404, detail="Category not found or unauthorized")
    return updated_category

@router.delete("/{category_id}", response_model=CategoryOut)
def remove_category(category_id: int, db: Session = Depends(get_db), token_data: UserOut = Depends(verify_token)):
    deleted = delete_category(db, category_id, token_data.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Category not found or unauthorized")
    return deleted