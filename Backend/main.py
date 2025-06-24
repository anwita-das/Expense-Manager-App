from fastapi import FastAPI, Depends
from routes.auth import router as auth_router  
from services.auth_services import verify_token
app = FastAPI()

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])  

@app.get("/api/protected")
def protected_route(token_data=Depends(verify_token)):
    return {"message": f"Hello, {token_data['sub']}! This is a protected route."}
    