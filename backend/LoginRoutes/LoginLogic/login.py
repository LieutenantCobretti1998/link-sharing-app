from datetime import datetime
from flask import Blueprint, request, jsonify, url_for
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, \
    set_access_cookies, set_refresh_cookies, unset_jwt_cookies, get_jwt, decode_token
from ...Database import db
from ...Database.models import User, BlackListToken, generate_reset_token, verify_reset_token
from ...Database.data_validator import UserLogic
from ...email_utils import send_mail

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


@login_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    user_instance = UserLogic(db.session)
    user = user_instance.find_email(data.get("email"))
    if not user:
        return jsonify({"message": "No user found with that email"}), 404
    token = generate_reset_token(user.id)
    reset_url = f"http://localhost:5173/reset-password/{token}"
    subject = "Password Reset Request"
    body = (f"Hello dear friend,\n\nTo reset your password, click the link below:\n{reset_url}.\n\nIf you did not "
            f"request a password reset, please ignore this email.\n\n This token will be valid for 5 minutes!")

    send_mail(user.email, subject, body)
    return jsonify({"message": "Password reset link sent to your email"}), 200


@login_bp.route("/reset-password/<string:token>", methods=["POST"])
def reset_password(token):
    user_id = verify_reset_token(token)
    user_instance = UserLogic(db.session)
    if user_id:
        token_data = decode_token(token)
        jti = token_data["jti"]
        expires_at = datetime.fromtimestamp(token_data["exp"])
        blacklist_entry = BlackListToken(jti=jti, expires_at=expires_at, user_id=user_id)
        db.session.add(blacklist_entry)
        db.session.commit()
        data = request.json
        new_password = generate_password_hash(data.get("updated_password"), salt_length=10)
        message, code = user_instance.update_password(user_id, new_password)
        return jsonify(message), code
    else:
        return jsonify({"message": "Invalid token"}), 401


@login_bp.route("/logout", methods=["POST"])
@jwt_required(refresh=True)
def logout():
    user_id = get_jwt_identity()
    if user_id:
        try:
            jwt_data = get_jwt()
            jti_refresh = jwt_data["jti"]
            expires_at_refresh = datetime.fromtimestamp(jwt_data["exp"])
            blacklist_token_refresh = BlackListToken(jti=jti_refresh, expires_at=expires_at_refresh, user_id=user_id)
            db.session.add(blacklist_token_refresh)
        except Exception:
            return jsonify({"message": "Invalid refresh token"}), 401
        try:
            access_token = request.cookies.get("access_token_cookie")
            if access_token:
                access_token_data = decode_token(access_token)

                jti_access = access_token_data["jti"]
                expires_at_access = datetime.fromtimestamp(access_token_data["exp"])
                access_blacklist = BlackListToken(jti=jti_access, expires_at=expires_at_access, user_id=user_id)
                db.session.add(access_blacklist)
        except Exception:
            # return jsonify({"message": "Invalid access token"}), 401
            pass
        response = jsonify({"message": "Successfully logged out"})
        unset_jwt_cookies(response)
        db.session.commit()
        return response, 200
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@login_bp.route('/auth_status', methods=['GET'])
@jwt_required()
def auth_status():
    user_id = get_jwt_identity()
    user = db.session.query(User).filter_by(id=user_id).first()
    if user:
        return jsonify({
            "authenticated": True,
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
