from flask import Blueprint, jsonify, request
from sqlalchemy.exc import OperationalError, NoResultFound

from ...database import GetAllLinksData, db, map_frontend_to_backend
from ...database.models import generate_short_unique_url
from .helpers import save_base64_image

links_bp = Blueprint('get_all_links', __name__)


@links_bp.route('/all_links', methods=['GET'])
def get_all_links():
    flask_server_url = "http://localhost:5000"
    page = int(request.args.get('page'))
    per_page = int(request.args.get('per_page'))
    get_links_instance = GetAllLinksData(db.session)
    try:
        all_links = get_links_instance.get_all_links(page, per_page)
        all_links_count = get_links_instance.all_links_count()
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
        return jsonify({
            "links": links_data,
            "current_page": page,
            "per_page": per_page,
            "total_links": all_links_count
        }), 200
    except OperationalError:
        return jsonify({"error": "Database Fatal Error"}), 500


@links_bp.route('/get-link/<int:links_group_id>', methods=['GET'])
def get_link(links_group_id):
    try:
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
    except OperationalError:
        return jsonify({"error": "Database Fatal Error"}), 500
    except NoResultFound:
        return jsonify({"error": "Not Found😒"}), 404


@links_bp.route('/update-link/<int:links_group_id>', methods=['PATCH'])
def update_links(links_group_id):
    links_data = request.json
    message, code = GetAllLinksData(db.session).update_links(links_data, links_group_id)
    return jsonify(message), code


@links_bp.route('/update-links-profile/<int:links_group_id>', methods=["PATCH"])
def update_links_profile(links_group_id):
    profile_data = request.json
    base64_image = profile_data.get("linksGroupImage")
    if base64_image != "" and base64_image and (
            not base64_image.startswith("http://") and not base64_image.startswith("https://")):
        try:
            filepath = save_base64_image(base64_image)
            profile_data["linksGroupImage"] = filepath
        except ValueError:
            message = "Invalid image extension. Please provide a valid image extension."
            return jsonify(message), 400
    backend_data = map_frontend_to_backend(profile_data)
    backend_data["links_group_image"] = "/static" + backend_data["links_group_image"].split("/static")[1]
    message, code = GetAllLinksData(db.session).update_profile_data(backend_data, links_group_id)
    return jsonify(message), code


@links_bp.route('/delete-link-group/<int:links_group_id>', methods=['DELETE'])
def delete_link_group(links_group_id):
    message, code = GetAllLinksData(db.session).delete_links_group_data(links_group_id)
    return jsonify(message), code
