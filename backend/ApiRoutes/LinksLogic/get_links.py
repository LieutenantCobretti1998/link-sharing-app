from flask import Blueprint, jsonify
from ...database import GetAllLinksData, db

links_bp = Blueprint('get_all_links', __name__)


@links_bp.route('/all_links', methods=['GET'])
def get_all_links():
    all_links = GetAllLinksData(db.session).get_all_links()
    flask_server_url = "http://localhost:5000"
    links_data = [
        {"id": link.id,
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
    return jsonify(links_data), 200


@links_bp.route('/get-link/<int:links_group_id>', methods=['GET'])
def get_link(links_group_id):
    chosen_link = GetAllLinksData(db.session).get_links_group_data(links_group_id)
    flask_server_url = "http://localhost:5000"
    chosen_link_data = {
        "linksGroupImage": f"{flask_server_url}/{chosen_link.links_group_image}" if chosen_link.links_group_image else "",
         "linksGroupName": chosen_link.links_group_name,
         "textColor": chosen_link.text_color,
         "commonColor": chosen_link.common_color,
         "backgroundColor": chosen_link.background_color,
         "backgroundImage": chosen_link.background_image,
         "category": chosen_link.category,
         "links": chosen_link.links
    }
    return jsonify(chosen_link_data), 200

# @links_bp.route('/update-link/<int:links_group_id>', methods=['PUT'])
# def update_link(links_group_id):
