from flask import Flask, jsonify,request
from werkzeug.security import generate_password_hash
from sql_con import connect_to_db
import hashlib, sql_con, dao_users, requests, jwt
from datetime import datetime
from flask_cors import CORS, cross_origin
from serpapi import GoogleSearch


app = Flask(__name__)
CORS(app)
SECRET_KEY = "your_secret_key_here"  # keep this secret, use env variable in production




#!fffffffffffffffffffffffffffffffffffffffffffffffffffff
@app.route("/getNews", methods=["POST"])
def getNews():
    data = request.get_json()
    pref = data.get('allPrefs')
    
    params = {
            "api_key": "6306dd79bed2954c61db0f189e0047417c124b5ee0825092957082d20ea30960",
            "engine": "google",
            "q": f"{pref}",
            "location": "Austin, Texas, United States",
            "google_domain": "google.com",
            "gl": "bd",
            "hl": "en",
            "safe": "off"
            }
    search = GoogleSearch(params)
    news = search.get_dict()
    
    return jsonify(news)










































































@app.route("/api/register", methods=["POST"])
def register_user():
    cnx = None
    try:
        cnx = sql_con.connect_to_db()
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return jsonify({"success": False, "message": "All fields are required"}), 400

        # Check email uniqueness
        if dao_users.get_user_by_email(cnx, email):
            return jsonify({"success": False, "message": "Email already registered"}), 400

        password_hash = generate_password_hash(password)
        created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        userinfo = (username, email, password_hash, created_at)
        dao_users.insert_into_users(cnx, userinfo)

        return jsonify({"success": True, "message": "✅ User registered successfully"}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if cnx:
            cnx.close()



#!asdfsadffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
from werkzeug.security import check_password_hash
import time

@app.route("/api/login", methods=["POST"])
def login_user():
    cnx = None
    try:
        cnx = sql_con.connect_to_db()
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        # 1. Validation
        if not email or not password:
            return jsonify({"success": False, "message": "All fields are required"}), 400

        # 2. Fetch user by email
        user = dao_users.get_user_by_email(cnx, email)
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        # 3. Verify password
        if not check_password_hash(user['password_hash'], password):
            return jsonify({"success": False, "message": "Invalid password"}), 401

        # 4. Generate JWT token
        token_payload = {
            "user_id": user['id'],
            "username": user['username'],
            "email": user['email'],
            "exp": int(time.time()) + 3600  # 1 hour expiry
        }

        token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "success": True,
            "message": "✅ Login successful",
            "token": token,
            "user": {
                "id": user['id'],
                "username": user['username'],
                "email": user['email']
            }
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

    finally:
        if cnx:
            cnx.close()






if __name__ == "__main__":
    app.run(debug=True)