import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router  
from routes.books import router as books_router 
from services.auth_services import verify_token
from routes.daily_expense import router as daily_expense_router  
from routes.loan_entries import router as loan_entry_router 
from routes.savings import router as savings_router 
from routes.category import router as category_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


origins = os.getenv("ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    return response

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])  
app.include_router(books_router, prefix="/api/books", tags=["Books"])
app.include_router(daily_expense_router, prefix="/api/expenses", tags=["Expenses"])
app.include_router(loan_entry_router, prefix="/api/loans", tags=["Loans"])
app.include_router(savings_router, prefix="/api/savings", tags=["savings"])
app.include_router(category_router,prefix="/api/categories", tags=["categories"])

from fastapi.staticfiles import StaticFiles

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/api/protected")
def protected_route(token_data=Depends(verify_token)):
    return {"message": f"Hello, {token_data.name}! This is a protected route."}


