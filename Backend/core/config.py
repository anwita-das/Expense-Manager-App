
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecret")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MYSQL_USER: str = os.getenv("root", "root")
    MYSQL_PASSWORD: str = os.getenv("new_password", "new_password")
    MYSQL_DB: str = os.getenv("expmanager", "expmanager")
    MYSQL_HOST: str = os.getenv("localhost", "localhost")
    MYSQL_PORT: str = os.getenv("MYSQL_PORT", "3306")

    @property
    def DATABASE_URL(self):
        #return f"mysql://root:A@kshun12345@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB}"
        return f"mysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB}"
settings = Settings()
