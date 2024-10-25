from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, \
    set_access_cookies, set_refresh_cookies, unset_jwt_cookies
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
        refresh_token = create_refresh_token(identity=user.id)
        profiles = []
        for profile in user.profiles:
            profiles.append({
                "username": profile.username,
            })
        user_data = {
            "email": user.email,
            "profiles": profiles,
        }
        response = jsonify({
            "message": "Successfully logged in",
            "user": user_data
        })
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)
        return response, 200
    return jsonify({"message": "Invalid username or password"}), 401


@login_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    user_id = get_jwt_identity()
    if user_id:
        response = jsonify({"message": "Successfully logged out"})
        unset_jwt_cookies(response)
        return response, 200
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@login_bp.route('/auth_status', methods=['GET'])
@jwt_required(refresh=True)
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


@login_bp.route('/token/refresh', methods=['POST'])
@jwt_required(refresh=True)
def token_refresh():
    current_user = get_jwt_identity()
    if current_user:
        access_token = create_access_token(identity=current_user)
        response = jsonify({
            "message": "Successfully logged in",
        })
        set_access_cookies(response, access_token)
        return response, 200
    else:
        return jsonify({'message': 'User does not authenticated'}), 401
