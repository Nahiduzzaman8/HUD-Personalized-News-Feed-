import mysql.connector

__cnx = None

def connect_to_db():
    global __cnx
    # Connect only if connection doesn't exist or is closed
    if __cnx is None or not __cnx.is_connected():
        try: 
            __cnx = mysql.connector.connect(
                host='kali',  # or 'localhost' if your DB is local
                user='root',
                password='root',
                database='hud'
            )
        except mysql.connector.Error as err:
            print(f"Database connection failed: {err}")
            __cnx = None
    return __cnx
