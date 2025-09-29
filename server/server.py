from flask import Flask, jsonify,request
from werkzeug.security import generate_password_hash
from sql_con import connect_to_db
from flask_cors import CORS
import hashlib
import jwt
from datetime import datetime

import sql_con
import dao_users

app = Flask(__name__)
CORS(app)
SECRET_KEY = "your_secret_key_here"  # keep this secret, use env variable in production


@app.route("/api/register", methods=["POST"])
def register_user():
    
    try:
        cnx = sql_con.connect_to_db()
        data = request.get_json()  # Receive JSON from React
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        
        # 1. Validation
        if not username or not email or not password:
            return jsonify({"error": "All fields (username, email, password) are required"}), 400

        # 2. Hash password (SHA-256)
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        userinfo = ( username, email, password_hash, created_at)
        dao_users.insert_into_users (cnx, userinfo)
        return jsonify({"message": "✅ User registered successfully"}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cnx:
            cnx.close()



@app.route("/api/login", methods=["POST"])
def login_user():
    try:
        cnx = sql_con.connect_to_db()
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        

        #Validation that every field is filled
        if  not email or not password:
            return jsonify({"error": "All fields are required"}), 400
        
        #Fetch user based on email
        user = dao_users.get_user_by_email(cnx, email)
        if not user: 
            return jsonify({"error": "User not found"}), 404
        
        #Hash the provided password and compare with stored hash
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        if password_hash != user['password_hash']:
            return jsonify({"error": "Invalid Password"}), 401
        
        #Generate JWT token
        token_payload = {
            "user_id": user['id'],
            "username": user['username'],
            "email": user['email'],
            "exp": datetime.utcnow().timestamp() + 3600  # Token expires in 1 hour
        }
        
        token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
        return jsonify({"message": "✅ Login successful", "token": token, "user":{
            "id": user['id'],
            "username": user['username'],
            "email": user['email']
        }}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cnx:
            cnx.close()







































if __name__ == "__main__":
    app.run(debug=True)