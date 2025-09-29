from flask import Flask, jsonify,request
from werkzeug.security import generate_password_hash
from sql_con import connect_to_db
from flask_cors import CORS

import sql_con
import dao_users

app = Flask(__name__)
cnx = sql_con.connect_to_db()
CORS(app)

@app.route("/")
def register():


    cnx = sql_con.connect_to_db()
    users = dao_users.get_all_data_from_users(cnx)
    return users





































































if __name__ == "__main__":
    app.run(debug=True)