from flask import Blueprint, jsonify, request
from ...database import map_frontend_to_backend
from ...database import SaveLinksDava
save_bp = Blueprint('save', __name__)


@save_bp.route('/save_link', methods=['POST'])
def save_link():
    data = request.get_json()
    save_links_class = SaveLinksDava()
    backend_data = map_frontend_to_backend(data)
    # try:
    #
    return jsonify(data)

