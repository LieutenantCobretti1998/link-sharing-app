from flask import Blueprint, jsonify, request
from ...ApiRoutes.LinksLogic.get_links import links_bp
from ...Database import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.Database.data_validator import UserLogic

profiles_bp = Blueprint('profiles', __name__)


@profiles_bp.route('/create_profile', methods=['POST'])
@jwt_required()
def create_profile():
    user_id = get_jwt_identity()
    if user_id:
        data = request.json
        username = data['new_profile_name']
        user_instance = UserLogic(db.session)
        message, code = user_instance.create_profile(user_id, username=username)
        return jsonify(message), code
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@profiles_bp.route('/choose_profile/<string:profile_name>', methods=['GET'])
@jwt_required()
def choose_profile(profile_name):
    user_id = get_jwt_identity()
    if user_id:
        user_instance = UserLogic(db.session)
        profile, message, code = user_instance.find_profile(profile_name)
        return jsonify({
            "message": message,
            "profile": profile,

        }), code


