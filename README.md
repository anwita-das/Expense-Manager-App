# Expense Manager App 💰

## Overview 📋
The Expense Manager App is a personal finance management tool designed to help users track and manage their daily expenses, loans, and savings. It provides an intuitive interface for recording financial transactions, visualizing savings growth, and monitoring loan repayments, making it an essential tool for anyone looking to take control of their finances. 🚀

## Problem Solved 🎯
Managing personal finances can be overwhelming due to the variety of transactions individuals handle daily, from routine expenses to loan repayments and savings contributions. The Expense Manager App addresses this by offering a centralized platform to categorize, track, and analyze financial activities, enabling users to make informed decisions and achieve their financial goals.

## Target Audience 👥
This app is designed for anyone who needs to record and manage their finances, including individuals, students, professionals, and small business owners seeking a clear overview of their financial activities.

## Unique Features ✨
- **Multi-Book System**: Organize finances into distinct "books" for daily expenses, loans, and savings, allowing tailored management of different financial aspects. 📚
- **Customizable Categories**: Users can create and manage their own custom categories for entries, tailoring the app to their specific financial needs. 🛠️
- **Comprehensive Filtering and Search**: Filter transactions by categories, payment methods, or entry types, and use search functionality for quick access to specific records. 🔍
- **Savings Growth Visualization**: Estimate profits from one-time or recurring deposits based on ROI and time, providing clear insights into savings growth. 📈
- **Loan Tracking**: Monitor loan balances and EMI payments with detailed summaries of paid and remaining amounts. 💸
- **Infinite Scroll Pagination**: Seamlessly browse large datasets of transactions with efficient pagination. 📜

## Features 🛠️
### Daily Expenses 💵
- Add **Cash In** or **Cash Out** entries.
- Assign custom or predefined categories to entries (e.g., groceries, utilities). 🏷️
- Filter entries by:
  - Category
  - Type (Cash In or Cash Out)
  - Payment method (Online or Offline)
- Search functionality to locate specific entries. 🔎
- View summaries of total Cash In, total Cash Out, and net amount.
- Infinite scroll pagination for smooth browsing. 🖱️

### Loan Entry 🏦
- Add **New Loan** or **EMI Payment** entries.
- Assign custom or predefined categories (e.g., Home Loan, Student Loan, Car Loan). 🏷️
- Filter entries by:
  - Category
  - Type (New Loan or EMI Payment)
- Track total EMI paid and remaining loan amount.
- Search and pagination support. 🔍📜

### Savings 💰
- Add **One-Time Deposit** or **Recurring Deposit** entries.
- Assign custom or predefined categories. 🏷️
- Calculate estimated profit based on principal amount, ROI, and time since deposit. 📊
- Filter entries by type (One-Time or Recurring).
- View summaries of total saved amount and estimated interest earned.
- Search and pagination support. 🔍📜

### Authentication 🔒
- Secure login and signup using **JWT tokens**.
- Passwords are hashed using **bcrypt** for enhanced security.

## Technologies Used 🧑‍💻
### Frontend
- **ReactJS**: For building a dynamic and responsive user interface. ⚛️
- **Tailwind CSS**: For styling and responsive design. 🎨
- **Shadcn UI Components**: For pre-built, customizable UI components.
- **Axios**: For making API calls to the backend. 🌐
- **FontAwesome, Undraw, Lucide React**: For icons and graphics. 🖼️
- **Other Libraries**: `date-fns`, `dayjs`, `react-router-dom`, `react-day-picker`, and more (see `package.json`).

### Backend
- **Python**: Core programming language. 🐍
- **FastAPI**: For building a fast and modern API. ⚡
- **Pydantic**: For data validation and schemas.
- **SQLAlchemy**: For ORM-based database interactions.
- **JWT**: For token-based authentication. 🔑
- **bcrypt**: For secure password hashing.
- **MySQL**: Relational database for storing financial data. 🗄️

## Prerequisites ✅
- **Node.js** (v18 or later) for the frontend.
- **Python** (v3.8 or later) for the backend.
- **MySQL** (v8.0 or later) for the database.
- **npm** or **yarn** for frontend dependency management.
- **pip** for backend dependency management.

## Installation 🛠️
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd expense-manager-app
   ```

2. **Set up the Database**
* Ensure MySQL is installed and running on your system.
* Log in to MySQL using a client (e.g., MySQL Workbench or command line):
```bash
mysql -u your-mysql-username -p your-mysql-password
```
* Create the database named `expmanager`:
```bash
CREATE DATABASE expmanager;
```
* Verify the database exists:
```bash
SHOW DATABASES;
```
* Import the database schema from `Backend/schema.sql`:
> Using MySQL Workbench:
  -> Open MySQL Workbench and connect to your MySQL server.
  -> Go to File > Open SQL Script, navigate to `expense-manager-app/Backend/schema.sql`, and open it.
  -> Click the Execute button (lightning bolt) or press `Ctrl+Shift+Enter` to run the script.
> Using command line:
```bash
mysql -u your-mysql-username -p expmanager < Backend/schema.sql
```
> Verify the tables were created:
```sql
USE expmanager;
SHOW TABLES;
```
You should see `users`, `books`, `categories`, `daily_expenses`, `loan_entries`, and `savings`.
> Exit the MySQL client:
```sql
EXIT;
```

3. **Set Up the Backend**:
Navigate to the backend directory:
```bash
cd backend
```
Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
Install dependencies from requirements.txt:
```bash
pip install -r requirements.txt
```
Create a .env file in the backend directory to configure environment variables for database connection and security. Example:
```plaintext
SECRET_KEY=your-secret-key
MYSQL_USER=your-mysql-username
MYSQL_PASSWORD=your-mysql-password
MYSQL_DB=your-database-name
MYSQL_HOST=localhost
MYSQL_PORT=3306
DB_DRIVER=mysql+mysqlconnector
ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```
* SECRET_KEY: A unique, secure key for JWT authentication (e.g., a random string).
* MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB: Your MySQL credentials and database name.
* MYSQL_HOST, MYSQL_PORT: Database host and port (default: localhost:3306).
* DB_DRIVER: Database driver (mysql+mysqlconnector for MySQL).
* ORIGINS: Allowed CORS origins for the frontend (matches frontend URLs).
Ensure MySQL is running and the specified database is created.

4. **Set Up the Frontend**:
Navigate to the frontend directory:
```bash
cd frontend
```
Install dependencies from package.json:
```bash
npm install
```
Create a .env file in the frontend directory to specify the backend API URL. Example:
```plaintext
VITE_API_BASE_URL=http://localhost:8000/api
```
VITE_API_BASE_URL: The base URL of the backend API (ensure the port and path match your FastAPI server, e.g., http://localhost:8000/api).
Ensure the backend API is accessible at the specified URL.

## Usage 🚀

1. **Run the Backend**:
From the backend directory, start the FastAPI server:
```bash
uvicorn main:app --reload
```
The backend will be available at http://localhost:8000.

2. **Run the Frontend**:
From the frontend directory, start the development server:
```bash
npm run dev
```
The frontend will be available at http://localhost:5173 (or the port specified by Vite).

## Access the App:
Open your browser and navigate to http://localhost:5173. 🌐

Sign up or log in to start managing your finances. 🔐
