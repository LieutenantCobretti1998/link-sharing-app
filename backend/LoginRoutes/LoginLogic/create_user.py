from datetime import datetime

from flask import Blueprint, request, jsonify, current_app as app
from flask_jwt_extended import decode_token
from werkzeug.security import generate_password_hash
from ...Database import db
from ...Database.models import generate_email_confirm_token, verify_email_confirmation_token, BlackListToken
from ...Database.data_validator import UserLogic
from ...email_utils import send_mail

create_user_bp = Blueprint('create_user', __name__)


@create_user_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    user_instance = UserLogic(db.session)
    password = generate_password_hash(data.get('password'), salt_length=10)
    user_data = dict(email=data.get('email'), password=password)
    message, code = user_instance.create_user(**user_data)
    return jsonify(message), code


@create_user_bp.route('/verify_email', methods=['POST'])
def verify_email():
    token = request.json.get('token')
    if not token:
        return jsonify({"message": "Verification token is missing"}), 400
    email = verify_email_confirmation_token(token)
    if not email:
        return jsonify({"message": "Token is invalid. Please resend"}), 400
    token_data = decode_token(token)
    jti = token_data["jti"]
    user_instance = UserLogic(db.session)
    user_id, message, code = user_instance.confirm_invalidate_email(email)
    expires_at = datetime.fromtimestamp(token_data["exp"])
    blacklist_entry = BlackListToken(jti=jti, expires_at=expires_at, user_id=user_id)
    db.session.add(blacklist_entry)
    db.session.commit()
    return jsonify(message), code


@create_user_bp.route('/send_email', methods=['POST'])
def send_email():
    email = request.json.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400
    token = generate_email_confirm_token(email)
    submission_url = f"{app.config["FRONTEND_URL"]}/confirmation/{token}"
    subject = "Confirm Your Email Address"
    html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <p>Hello,</p>
                <p>Thank you for signing up in DevLinks App! To be able to create your account, please click the button below to verify 
                your email address which will be valid for 2 minutes.</p>
                <p style="text-align: center;">
                    <a href="{submission_url}" style="display: inline-block; padding: 10px 20px; color: #fff; 
                    background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold;"> Verify 
                    Email Address </a> </p> <p>If you did not sign up, no further action is required, and your email 
                    address will be deleted automatically after a few days.</p> <p>Kind regards,<br>YDevLinks App</p> 
                    <hr> <p style="font-size: 0.9em; color: #555;"> If you're having trouble clicking the "Verify 
                    Email Address" button, copy and paste the URL below into your web browser: <br><a href="
                    {submission_url}" style="color: #007bff;">{submission_url}</a>
                </p>
            </body>
        </html>
        """
    send_mail(email, subject, html=html_content)
    return jsonify({"message": "Confirmation link was sent to email"}), 200
