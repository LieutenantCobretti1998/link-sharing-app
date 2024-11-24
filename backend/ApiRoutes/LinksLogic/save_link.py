import base64
from flask import Blueprint, jsonify, request, current_app as app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.exceptions import RequestEntityTooLarge
from ...Database import map_frontend_to_backend, SaveLinksData, db, UserLogic
from ...Database.models import generate_short_unique_url
from .helpers import save_base64_image
save_bp = Blueprint('save', __name__)


@save_bp.route('/save_link/<int:profile_id>', methods=['POST'])
@jwt_required()
def save_link(profile_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    profile_name = data["profileName"]
    user_instance = UserLogic(db.session)
    if user_id:
        user_allowed_profile = user_instance.check_user_profile_match(user_id, profile_id, profile_name)
        if user_allowed_profile:
            base64_image = data.get("linksGroupImage")
            if base64_image != "":
                try:
                    filepath = save_base64_image(base64_image)
                    data["linksGroupImage"] = filepath
                except RequestEntityTooLarge:
                    return jsonify({"error": "Too large image. 2m is a maximum."}), 413
                except ValueError:
                    return jsonify({"error": "Invalid image extension. Please provide a valid image extension."}), 400
            data.pop("profileName")
            data.update({"profile_id": profile_id})

            shorten_url = generate_short_unique_url(db.session, profile_name)
            data["shorten_url"] = shorten_url
            backend_data = map_frontend_to_backend(data)
            save_links_class = SaveLinksData(backend_data, db.session)
            message, code = save_links_class.save_links()
            return jsonify(message), code
        else:
            return jsonify({"error": "Something happened"}), 500
    else:
        return jsonify({"message": "User is not authorized"}), 401


