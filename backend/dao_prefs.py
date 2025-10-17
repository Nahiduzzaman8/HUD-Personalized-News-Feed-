# import sql_con
#fetch prefs
def fetch_prefs(cnx):
    cursor = cnx.cursor(dictionary=True) 
    query = """
    Select preferences.id, 
           preferences.user_id, 
           preferences.category
        from preferences
    """
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close
    cnx.close()
    return data

#fetch prefs by user_id
def fetch_prefs_by_user_id(cnx, user_id):
    cursor = cnx.cursor() 
    query = """
    Select preferences.category
        from preferences
    where user_id = %s
    """
    cursor.execute(query, (user_id,))
    data = cursor.fetchall()
    cursor.close
    cnx.close()
    
    
    result = []
    for row in data:
        result.append(row[0])
    return result

#insert prefs
def insert_prefs(cnx, prefsinfo):
    cursor = cnx.cursor()
    query = """
    insert into preferences ( user_id, category)
                    values( %s, %s)
    """
    cursor.execute(query, (prefsinfo[0], prefsinfo[1],))
    cnx.commit()
    cursor.close()
    cnx.close()

#update prefs
def update_prefs(cnx, prefsinfo):
    cursor = cnx.cursor()
    query = """
    update preferences
    set category = %s
    where user_id = %s
    """
    cursor.execute(query, (prefsinfo[0], prefsinfo[1]))
    cnx.commit()
    cursor.close()
    cnx.close()

#delete prefs
def delete_prefs(cnx, user_id):
    cursor = cnx.cursor()
    query = """
    delete from preferences
    where user_id = %s
    """
    cursor.execute(query, (user_id,))
    cnx.commit()
    cursor.close()
    cnx.close()


# # For testing purpose only
# if __name__ == '__main__': 
#     # cnx = sql_con.connect_to_db()
#     # insert_prefs(cnx, (22, 'business'))
    
#     # cnx = sql_con.connect_to_db()
#     # print(fetch_prefs(cnx))
    
#     # cnx = sql_con.connect_to_db()
#     # update_prefs(cnx, ('entertainment', 22))
    
#     # cnx = sql_con.connect_to_db()
#     # print(fetch_prefs_by_user_id(cnx, 21))
#     pass