from flask import Blueprint, request, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash
from ...Database import db
from backend.Database.data_validator import UserLogic

create_user_bp = Blueprint('create_user', __name__)

@create_user_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    user_instance = UserLogic(db.session)
    password = generate_password_hash(data.get('password'), salt_length=10)
    user_data = dict(email=data.get('email'), password=password)
    # if user_instance.find_user(data.get('username')):
    #     return jsonify({'message': 'User already exists'}), 409
    message, code = user_instance.create_user(data.get("username"), **user_data)
    return jsonify(message), code