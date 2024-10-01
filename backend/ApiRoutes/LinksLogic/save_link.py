from flask import Blueprint, jsonify, request
from ...database import map_frontend_to_backend, SaveLinksData, db
from ...database.models import generate_short_unique_url
from .helpers import save_base64_image
save_bp = Blueprint('save', __name__)


@save_bp.route('/save_link', methods=['POST'])
def save_link():
    data = request.get_json()
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


