from datetime import datetime
from flask import Blueprint, request, jsonify, current_app as app
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, \
    set_access_cookies, set_refresh_cookies, unset_jwt_cookies, get_jwt, decode_token
from ...Database import db
from ...Database.models import User, BlackListToken, generate_reset_token, verify_reset_token
from ...Database.data_validator import UserLogic
from ...email_utils import send_mail
from ...exceptions import DeleteUserError

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
    reset_url = f"{app.config["FRONTEND_URL"]}/reset-password/{token}"
    subject = "Password Reset Request"
    html_content = f""" <html> <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;"> 
    <p>Hello,</p> <p>Thank you for signing up in DevLinks App! To be able to reset your password, please click the 
    button below to reset your password which will be valid for 5 minutes.</p> <p style="text-align: center;"> <a 
    href="{reset_url}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; 
    text-decoration: none; border-radius: 5px; font-weight: bold;"> Reset Password </a> </p> <p>If you did not call 
    this action, no further action is required, and your email address will be deleted automatically after a few days.
    </p> 
    <p>Kind regards,<br>DevLinks App</p> <hr> <p style="font-size: 0.9em; color: #555;"> If you're having trouble 
    clicking the "Verify Email Address" button, copy and paste the URL below into your web browser: <br><a href=" 
    {reset_url}" style="color: #007bff;">{reset_url}</a>
                    </p>
                </body>
            </html>
            """

    send_mail(user.email, subject, html=html_content)
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


@login_bp.route("/delete-account", methods=["DELETE"])
@jwt_required()
def delete_account():
    user_id = get_jwt_identity()
    user_instance = UserLogic(db.session)
    refresh_token = request.cookies.get('refresh_token_cookie')
    access_token = request.cookies.get('access_token_cookie')
    if refresh_token:
        refresh_token_data = decode_token(refresh_token)
        user_id_from_refresh = refresh_token_data["sub"]  # Typically, "sub" contains the user_id
    else:
        return jsonify({'message': 'Refresh token missing'}), 401

    if not user_id:
        return jsonify({'message': 'User not authenticated'}), 401

    if user_id != user_id_from_refresh:
        return jsonify({'message': 'Token mismatch'}), 401

    try:
        # Delete the user account
        message = user_instance.delete_account(user_id)

        # Blacklist the access token
        try:
            access_token_data = decode_token(access_token)
            jti_access = access_token_data["jti"]
            expires_at_access = datetime.fromtimestamp(access_token_data["exp"])
            access_blacklist = BlackListToken(
                jti=jti_access, expires_at=expires_at_access, user_id=user_id
            )
            db.session.add(access_blacklist)
        except Exception:
            return jsonify({"message": "Invalid access token"}), 401

        # Blacklist the refresh token
        try:
            jti_refresh = refresh_token_data["jti"]
            expires_at_refresh = datetime.fromtimestamp(refresh_token_data["exp"])
            blacklist_token_refresh = BlackListToken(
                jti=jti_refresh, expires_at=expires_at_refresh, user_id=user_id
            )
            db.session.add(blacklist_token_refresh)
        except Exception:
            return jsonify({"message": "Invalid refresh token"}), 401

        # Unset the JWT cookies
        response = jsonify({"message": "Account deleted successfully"})
        unset_jwt_cookies(response)
        db.session.commit()
        return response, 200

    except DeleteUserError as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), e.status_code

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An unexpected error occurred"}), 500


@login_bp.route('/auth_status', methods=['GET'])
@jwt_required()
def auth_status():
    user_id = get_jwt_identity()
    user = db.session.query(User).filter_by(id=user_id, is_active=True).first()
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
    current_user_id = get_jwt_identity()
    old_access_token = request.cookies.get('access_token_cookie')
    if current_user_id and old_access_token:
        access_token_data = decode_token(old_access_token, allow_expired=True)
        jti_access = access_token_data["jti"]
        expires_at_access = datetime.fromtimestamp(access_token_data["exp"])
        access_blacklist = BlackListToken(
            jti=jti_access, expires_at=expires_at_access, user_id=current_user_id
        )
        db.session.add(access_blacklist)
        access_token = create_access_token(identity=current_user_id)
        response = jsonify({
            "message": "Successfully logged in",
        })
        set_access_cookies(response, access_token)
        return response, 200
    else:
        return jsonify({'message': 'User does not authenticated'}), 401
