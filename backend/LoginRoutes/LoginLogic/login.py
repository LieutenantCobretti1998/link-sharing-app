from flask import Blueprint
from flask_login import login_user, logout_user
from werkzeug.security import check_password_hash
from backend import login_manager, db
from backend.database.models import User

login_bp = Blueprint('login', __name__)

@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(user_id)