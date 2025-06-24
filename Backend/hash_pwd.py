from passlib.context import CryptContext

# This matches your project’s setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Replace these with your actual passwords
passwords = [
    "password123",
    "helloWorld!",
    "pass@word1",
    "letmein123",
    "qwerty789",
    "welcome123",
    "myPass2024",
    "summer2024",
    "secure*pass",
    "test1234"
]

for pwd in passwords:
    hashed = pwd_context.hash(pwd)
    print(f"{pwd} -> {hashed}")
