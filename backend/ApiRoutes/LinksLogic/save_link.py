from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...Database import map_frontend_to_backend, SaveLinksData, db, UserLogic
from ...Database.models import generate_short_unique_url
from .helpers import save_base64_image
save_bp = Blueprint('save', __name__)


@save_bp.route('/save_link', methods=['POST'])
@jwt_required()
def save_link():
    data = request.get_json()
    user_id = get_jwt_identity()
    user_instance = UserLogic(db.session)
    if user_id:
        base64_image = data.get("linksGroupImage")
        if base64_image != "":
            try:
                filepath = save_base64_image(base64_image)
                data["linksGroupImage"] = filepath
            except ValueError:
                message = "Invalid image extension. Please provide a valid image extension."
                return jsonify(message), 400
        shorten_url = generate_short_unique_url(db.session)
        data["shorten_url"] = shorten_url
        backend_data = map_frontend_to_backend(data)
        save_links_class = SaveLinksData(backend_data, db.session)
        message, code = save_links_class.save_links()
        return jsonify(message), code
    else:
        return jsonify({"message": "User is not authorized"}), 400


