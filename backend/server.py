from flask import Flask, jsonify,request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin
from serpapi import GoogleSearch
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
from datetime import timedelta, datetime
from flask_jwt_extended import decode_token

import sql_con,dao_users #,dao_prefs

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "ami kawk bolini shey naam"
# app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY") # environment variable for security
SECRET_KEY = "your_secret_key_here"  # env variable in production
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)


#!ffffffffffffffffffffffff---------Register----------fffffffffffffffffffffffffffff
@app.route("/register", methods=["POST"])
def register_user():
    cnx = None
    try:
        cnx = sql_con.connect_to_db()
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return jsonify({"status": "Failed", 
                            "message": "All fields are required"
                            }), 400
            
        # Check username uniqueness
        if dao_users.get_user_by_username(cnx, username):
            return jsonify({"status": "Failed",
                            "message": "Username already registered"
                            }), 400
            
        # Check email uniqueness
        if dao_users.get_user_by_email(cnx, email):
            return jsonify({"status": "Failed",
                            "message": "Email already registered"
                            }), 400
        
        password_hash = generate_password_hash(password)
        created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # Insert new user into the database
        dao_users.insert_into_users(cnx, (username, email, password_hash, created_at))
        return jsonify({"status": "Success", 
                        "message": "✅ User registered successfully"
                        }), 201

    except Exception as e:
        return jsonify({"status": "Failed From exception", 
                        "message": str(e)
                        }), 500
    finally:
        if cnx:
            cnx.close()


#!ffffffffffffffffffffffff---------dashboard----------fffffffffffffffffffffffffffff
@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():    
    return jsonify({
        "status": "Success",
        "message": "Welcome to your dashboard. You are viewing a protected route!",
    }), 200

#!ffffffffffffffffffffffff---------Login----------fffffffffffffffffffffffffffff
@app.route("/login", methods=["POST"])
def login_user():
    cnx = None
    try:
        cnx = sql_con.connect_to_db()
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        # 1. Validation
        if not email or not password:
            return jsonify({"status": "Failed",
                            "message": "All fields are required"
                            }), 400
            
        # 2. Fetch user by email, if NONE return error
        user = dao_users.get_user_by_email(cnx, email)
        if not user:
            return jsonify({"status": "Failed", 
                            "message": "User not found"
                            }), 404

        # 3. Verify password
        #if not check_password_hash(user['password_hash'], password):
        if not check_password_hash(user['password_hash'], password):
            return jsonify({"status": "Failed", 
                            "message": "Invalid password"
                            }), 401

        #* 4. Generate JWT token
        token = create_access_token(identity=str(user['id']),
                                    additional_claims = {
                                        "username": str(user['username']),
                                        "email": str(user['email'])
                                    })
        # token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
        return jsonify({
            "status": "Success",
            "message": "✅ Login successful",
            "token": token,
            "user": {
                "id": str(user['id']),
                "username": str(user['username']),
                "email": str(user['email'])
            }
        }), 200

    except Exception as e:
        return jsonify({"status": "Failed", 
                        "message": str(e)
                        }), 500

    finally:
        if cnx:
            cnx.close()


#!ffffffffffffffffffffffff---------Get News----------fffffffffffffffffffffffffffff
@app.route("/getNews", methods=["POST"])
def getNews():
    data = request.get_json()
    pref = data.get('allPrefs')
    # current_user = get_jwt_identity()
    # cnx = sql_con.connect_to_db()
    # prefs = dao_prefs.fetch_prefs_by_user_id(cnx, current_user)
    
    params = {
            "api_key": "6306dd79bed2954c61db0f189e0047417c124b5ee0825092957082d20ea30960",
            "engine": "google",
            "q": f"news about {pref}, only news",
            "location": "Austin, Texas, United States",
            "google_domain": "google.com",
            "gl": "bd",
            "hl": "en",
            "safe": "off"
            }
    search = GoogleSearch(params)
    news = search.get_dict()
    return jsonify(news)

# #fetch prefs
# @app.route("/fetchPrefs", methods=["POST"])
# @jwt_required()
# def fetchPrefs():
#     current_user = get_jwt_identity()
#     cnx = sql_con.connect_to_db()
#     prefs = dao_prefs.fetch_prefs_by_user_id(cnx, current_user)
#     return jsonify(prefs)


if __name__ == "__main__":
    app.run(debug=True)