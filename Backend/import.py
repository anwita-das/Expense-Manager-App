import logging
import coloredlogs
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG', logger = logger)

def csv():
        global data
        try:
            file_path = '/Users/mac/allfiles/EXPMANAGER/Expense-Manager-App/Backend/users.csv'
            data = pd.read_csv(file_path)
            print(data.to_string())
        except Exception as e:
            logger.error(f"ERROR IN FILE PATH: {str(e)}")
            print(f"Error: {str(e)}")
csv()


def mysql():
    import mysql.connector
    global conn
    try:
        db_config = {
        'host': 'localhost',
        'user': 'root',
        'password': 'new_password',
        'database': 'expmanager'
         }
        conn = mysql.connector.connect(**db_config)
    except:
        logger.error("ERROR IN SQL CONNECTION")
mysql()


def connection():
    if conn.is_connected():
        mycursor = conn.cursor()
        for _, row in data.iterrows():
            sql = """
            INSERT INTO users (
            name, email, hashed_password, Created_time
            ) VALUES (%s, %s, %s, %s)
            """
            values = (
            row['name'], row['email'], row['hashed_password'], row['Created_time'])
            mycursor.execute(sql, values)
            conn.commit()



connection()






def csv2():
        global data
        try:
            file_path = '/Users/mac/allfiles/EXPMANAGER/Expense-Manager-App/Backend/books.csv'
            data = pd.read_csv(file_path)
            print(data.to_string())
        except Exception as e:
            logger.error(f"ERROR IN FILE PATH: {str(e)}")
            print(f"Error: {str(e)}")
csv2()



def connection2():
    if conn.is_connected():
        mycursor = conn.cursor()
        for _, row in data.iterrows():
            sql = """
            INSERT INTO books (
            user_id, title, description, type, created_at
            ) VALUES (%s, %s, %s, %s, %s)
            """
            values = (
            row['user_id'], row['title'], row['description'], row['type'], row['created_at'])
            mycursor.execute(sql, values)
            conn.commit()

connection2()

