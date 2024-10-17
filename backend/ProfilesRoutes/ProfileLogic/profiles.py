from flask import Blueprint, jsonify, request
from flask_login import current_user
from ...ApiRoutes.LinksLogic.get_links import links_bp

profiles_bp = Blueprint('profiles', __name__)

@links_bp.route('/profiles', methods=['GET'])
def get_profiles():
    user_profiles = current_user.profiles
    return jsonify(user_profiles), 200