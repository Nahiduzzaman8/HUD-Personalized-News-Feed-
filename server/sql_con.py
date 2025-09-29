import mysql.connector
__cnx = None

def connect_to_db():
    global __cnx
    if __cnx is None or __cnx.is_connected():
        try: 
            __cnx = mysql.connector.connect(
            host = 'kali',
            user = 'root',
            password = 'root',
            database = 'hud'
        )
        except mysql.connector.Error as err:
            print(f"Database connection failed: {err}")
            __cnx = None
    return __cnx; 
