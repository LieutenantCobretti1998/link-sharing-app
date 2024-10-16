from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user
from backend import db
from ...extensions import login_manager
from backend.database.models import User
from backend.database.data_validator import UserLogic

login_bp = Blueprint('login', __name__)

@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(user_id)

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    data = request.json
    user_instance = UserLogic(db.session)
    user = user_instance.check_user(data.get("password"), data.get("email"))
    if user:
        login_user(user)
        return jsonify({"message": "Successfully logged in!"}), 200
    return jsonify({"message": "Invalid username or password!"}), 401