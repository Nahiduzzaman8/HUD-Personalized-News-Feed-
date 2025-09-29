import mysql.connector
import sql_con

def get_all_data_from_users(cnx):
    cursor = cnx.cursor(dictionary=True) 
    query = """
    Select users.id, 
           users.username, 
           users.email, 
           users.password_hash, 
           users.created_at
        from users
    """
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close
    return data
    #SELECT * FROM users;


def insert_into_users (cnx, userinfo):
    cursor = cnx.cursor()
    query = """
    insert into users (id, username, email, password_hash, created_at)
                      values(%s, %s, %s, %s, %s)
    """
    cursor.execute(query, ((userinfo[0], userinfo[1], userinfo[2], userinfo[3],userinfo[4],)))
    cnx.commit()





























if __name__ == '__main__': 
    cnx = sql_con.connect_to_db()
    userinfo = (1, 'asdf', 'fasdf', 'asdf','2023-10-27 15:30:00')
    insert_into_users (cnx, userinfo)
    print(get_all_data_from_users(cnx))
