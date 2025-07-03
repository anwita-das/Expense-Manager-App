from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router  
from routes.books import router as books_router 
from services.auth_services import verify_token
from routes.daily_expense import router as daily_expense_router  
from routes.loan_entries import router as loan_entry_router 
from routes.savings import router as savings_router 
from routes.category import router as category_router


app = FastAPI()


origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])  
app.include_router(books_router, prefix="/api/books", tags=["Books"])
app.include_router(daily_expense_router, prefix="/api/expenses", tags=["Expenses"])
app.include_router(loan_entry_router, prefix="/api/loans", tags=["Loans"])
app.include_router(savings_router, prefix="/api/savings", tags=["savings"])
app.include_router(category_router,prefix="/api/categories", tags=["categories"])


@app.get("/api/protected")
def protected_route(token_data=Depends(verify_token)):
    return {"message": f"Hello, {token_data.name}! This is a protected route."}


