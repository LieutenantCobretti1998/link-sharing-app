from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ...Database import db
from backend.Database.models import User
from backend.Database.data_validator import UserLogic

login_bp = Blueprint('login', __name__)


@login_bp.route('/login', methods=["POST", "GET"])
def login():
    data = request.json
    user_instance = UserLogic(db.session)
    user = user_instance.check_user(data.get("password"), data.get("email"))
    if user:
        access_token = create_access_token(identity=user.id)
        profiles = []
        for profile in user.profiles:
            profiles.append({
                "username": profile.username,
            })
        user_data = {
            "email": user.email,
            "profiles": profiles,
        }
        return jsonify({"message": "Successfully logged in",
                        "access_token": access_token,
                        "user_data": user_data
                        }), 200
    return jsonify({"message": "Invalid username or password"}), 401

@login_bp.route('/auth_status', methods=['GET'])
@jwt_required()
def auth_status():
    user_id = get_jwt_identity()
    user = db.session.query(User).filter_by(id=user_id).first()
    if user:
        profiles = []
        for profile in user.profiles:
            profiles.append({
                "username": profile.username,
            })
        return jsonify({
            "authenticated": True,
            "user": {
                "email": user.email,
                "profiles": profiles,
            }
        }), 200
    else:
        return jsonify({
            "authenticated": False,
        }), 401