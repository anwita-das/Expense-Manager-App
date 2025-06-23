from fastapi import FastAPI, HTTPException
import mysql.connector
from pydantic import BaseModel , EmailStr
import logging
import coloredlogs
from fastapi import Query
from pydantic import Field
from fastapi import Request, Header
from typing import Optional




logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG', logger=logger)

class users(BaseModel):
    Name : str
    Email : str
    Password : str
    Created_time : str

 
 
app = FastAPI()   
def db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='A@kshun12345',
            database='carsales'
        )
        logger.info("|============================|")
        logger.debug("MYSQL CONNECTED SUCCESSFULLY!")
        logger.info("|============================|")

        return conn
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")
    
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str    



@app.get("/signup")
def signup(user: UserSignup):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE Email = '{user.email}'")
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already registered")


    cursor.execute(
        "INSERT INTO users (Name, Email, Password, Created_time) VALUES (%s, %s, %s, NOW())",
        (user.name, user.email, user.password)
    )
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if result:
        return {"message": "You're Signedin!"}
    else:
        raise HTTPException(status_code=401, detail="User could not be signed in")



@app.get("/login")
def login(user: UserLogin):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute(
query = f"SELECT * FROM users WHERE Email = '{user.email}' AND Password = '{user.password}'"    
    )
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if result:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    




