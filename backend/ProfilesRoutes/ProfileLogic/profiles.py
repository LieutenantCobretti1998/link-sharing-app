from flask import Blueprint, jsonify, request
from ...ApiRoutes.LinksLogic.get_links import links_bp
from ...Database import db, UserLogic
from sqlalchemy import update, values
from flask_jwt_extended import jwt_required, get_jwt_identity

from ...Database.models import LinksGroup

profiles_bp = Blueprint('profiles', __name__)


@profiles_bp.route('/related-profiles', methods=['GET'])
@jwt_required()
def get_related_profiles():
    user_id = get_jwt_identity()
    if user_id:
        user_instance = UserLogic(db.session)
        message, code = user_instance.find_related_profiles(user_id)
        return message, code
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


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
        profile, message, code = user_instance.find_profile(profile_name, user_id)
        return jsonify({
            "message": message,
            "profile": profile,

        }), code
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@profiles_bp.route("/change-profile-name/<int:profile_id>/<string:profile_name>", methods=['PATCH'])
@jwt_required()
def change_profile_name(profile_id, profile_name):
    user_id = get_jwt_identity()
    data = request.json
    user_instance = UserLogic(db.session)
    if user_id:
        user_allowed_profile = user_instance.check_user_profile_match(user_id, profile_id, profile_name)
        if user_allowed_profile:
            message, code = user_instance.update_profile_name(profile_id, profile_name, data['new_profile_name'])
            try:
                stmt = (
                    update(LinksGroup)
                    .where(LinksGroup.profile_id == profile_id, LinksGroup.shorten_url.ilike(f"%{profile_name}%"))
                    .values(
                        shorten_url=db.func.replace(LinksGroup.shorten_url, profile_name, data['new_profile_name'])
                    )
                )
                db.session.execute(stmt)
                db.session.commit()
            except Exception as e:
                return jsonify({"error": "Something happened"}), 500
            return jsonify(message), code
        else:
            return jsonify({"error": "Something happened"}), 500
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@profiles_bp.route("/delete-profile/<int:profile_id>/<string:profile_name>", methods=['DELETE'])
@jwt_required()
def delete_profile(profile_id, profile_name):
    user_id = get_jwt_identity()
    user_instance = UserLogic(db.session)
    if user_id:
        user_allowed_profile = user_instance.check_user_profile_match(user_id, profile_id, profile_name)
        if user_allowed_profile:
            message, code = user_instance.delete_profile(profile_id, profile_name)
            return jsonify(message), code
        else:
            return jsonify({"error": "Something happened"}), 500
    else:
        return jsonify({'message': 'User does not authenticated'}), 401
