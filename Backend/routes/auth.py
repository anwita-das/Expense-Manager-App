from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import File, UploadFile, Form
import shutil
import os
from typing import Optional
from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.user import User
from schemas import user as schemas
from services.auth_services import get_password_hash, verify_password, create_access_token
from datetime import timedelta
from db.session import get_db
from services.auth_services import verify_token
 
router = APIRouter()
 
 
@router.post("/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter((User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail=" Email already registered")
    hashed_pw = get_password_hash(user.password)
    print(f"Generated hash for new user: '{hashed_pw}'")
    new_user = User(name=user.name, email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
 
 
@router.post("/login", response_model=schemas.Token)
def login(form_data: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == form_data.email).first()
    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": db_user.email}, expires_delta=timedelta(minutes=180))
    return {"access_token": access_token, "token_type": "bearer"}
 
 
@router.get("/books")
def protected_route(current_user: User = Depends(verify_token)):
    """Example protected route"""
    return {
        "message": f"Hello, {current_user.name}! This is a protected route.",
        "ID": current_user.id,
        "email": current_user.email
    }
 
@router.get("/profile", response_model=schemas.UserOut)
def get_profile(current_user: User = Depends(verify_token)):
    return current_user
 
@router.put("/update-profile", response_model=schemas.UserOut)
def update_profile(update_data: schemas.UserUpdate, current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    current_user.name = update_data.name
    current_user.email = update_data.email
    current_user.currency_preference = update_data.currency_preference
    db.commit()
    db.refresh(current_user)
    return current_user
 
@router.put("/upload-photo", response_model=schemas.UserOut)
def upload_profile_photo(
    file: UploadFile = File(...),
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db),
):
    uploads_dir = "uploads"
    os.makedirs(uploads_dir, exist_ok=True)
 
    filename = f"user_{current_user.id}_{file.filename}"
    file_path = os.path.join(uploads_dir, filename)
 
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
 
    current_user.profile_photo_url = f"/{file_path}"
    db.commit()
    db.refresh(current_user)
    return current_user
 
@router.delete("/delete-photo", response_model=schemas.UserOut)
def delete_profile_photo(current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    if current_user.profile_photo_url:
        try:
            file_path = current_user.profile_photo_url.lstrip("/")
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error deleting file: {e}")
 
    current_user.profile_photo_url = None
    db.commit()
    db.refresh(current_user)
    return current_user