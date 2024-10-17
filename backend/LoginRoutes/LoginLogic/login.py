from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from flask_cors import cross_origin
from ...Database import db
from ...extensions import login_manager
from backend.Database.models import User
from backend.Database.data_validator import UserLogic

login_bp = Blueprint('login', __name__)

@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(user_id)

@login_bp.route('/login', methods=["POST", "GET"])
def login():
    data = request.json
    user_instance = UserLogic(db.session)
    user = user_instance.check_user(data.get("password"), data.get("email"))
    if user:
        login_user(user, remember=True)
        return jsonify({"message": "Successfully logged in"}), 200
    return jsonify({"message": "Invalid username or password"}), 401

@login_bp.route('/auth_status', methods=['GET'])
def auth_status():
    print(current_user.is_authenticated)
    if current_user.is_authenticated:
        profiles = []
        for profile in current_user.profiles:
            profiles.append({
                "username": profile.username,
            })
        return jsonify({
            "authenticated": True,
            "user": {
                "email": current_user.email,
                "profiles": profiles,
            }
        }), 200
    else:
        return jsonify({
            "authenticated": False,
        }), 401