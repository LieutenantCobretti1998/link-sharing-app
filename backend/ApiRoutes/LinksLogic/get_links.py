from flask import Blueprint, jsonify, request, send_from_directory
from ...database import map_frontend_to_backend, GetAllLinksData, db

all_links_bp = Blueprint('get_all_links', __name__)


@all_links_bp.route('/all_links', methods=['GET'])
def get_all_links():
    all_links = GetAllLinksData(db.session).get_all_links()
    flask_server_url = "http://localhost:5000"
    links_data = [
        {
            "linksGroupImage": f"{flask_server_url}/{link.links_group_image}" if link.links_group_image else "",
            "linksGroupName": link.links_group_name,
            "textColor": link.text_color,
            "commonColor": link.common_color,
            "backgroundColor": link.background_color,
            "backgroundImage": link.background_image,
            "category": link.category,
            "links": link.links
        } for link in all_links
    ]
    return jsonify(links_data)
