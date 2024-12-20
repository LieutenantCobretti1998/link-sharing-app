from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import OperationalError, NoResultFound
from ...Database import GetAllLinksData, db, map_frontend_to_backend, UserLogic
from .helpers import save_base64_image, format_links_data
from .ui_sets import perPage

links_bp = Blueprint('get_all_links', __name__)


@links_bp.route('/all_links/<int:profile_id>/<string:profile_name>', methods=['GET'])
@jwt_required()
def get_all_links(profile_id, profile_name):
    page = int(request.args.get('page'))
    search = request.args.get('search', "").strip()
    per_page = perPage
    get_links_instance = GetAllLinksData(db.session)
    user_instance = UserLogic(db.session)
    user_id = get_jwt_identity()
    if user_id:
        user_allowed_profile = user_instance.check_user_profile_match(user_id, profile_id, profile_name)
        if user_allowed_profile:
            try:
                if search:
                    all_links = get_links_instance.get_searched_links(page, per_page, search, profile_id)
                    total_links = get_links_instance.all_searched_links_count(search, profile_id)
                else:
                    all_links = get_links_instance.get_all_links(page, per_page, profile_id)
                    total_links = get_links_instance.all_links_count(profile_id)
                links_data = [format_links_data(link) for link in all_links]
                return jsonify({
                    "links": links_data,
                    "current_page": page,
                    "per_page": per_page,
                    "total_links": total_links
                }), 200
            except OperationalError:
                return jsonify({"error": "Database Fatal Error"}), 500
        else:
            return jsonify({"error": "Something happened"}), 500
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@links_bp.route('/get-link/<int:profile_id>/<string:profile_name>/<int:links_group_id>', methods=['GET'])
@jwt_required()
def get_link(links_group_id, profile_name, profile_id):
    user_id = get_jwt_identity()
    user_instance = UserLogic(db.session)
    if user_id:
        user_allowed_profile = user_instance.check_user_profile_match(user_id, profile_id, profile_name)
        if user_allowed_profile:
            try:
                chosen_link = GetAllLinksData(db.session).get_links_group_data(links_group_id)
                chosen_link_data = {
                    "linksGroupImage": chosen_link.links_group_image if chosen_link.links_group_image else "",
                    "shorten_url": chosen_link.shorten_url,
                    "shortDescription": chosen_link.short_description,
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
        else:
            return jsonify({"error": "Something happened"}), 500
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@links_bp.route('/update-link/<int:profile_id>/<string:profile_name>/<int:links_group_id>', methods=['PATCH'])
@jwt_required()
def update_links(links_group_id, profile_id, profile_name):
    user_id = get_jwt_identity()
    user_instance = UserLogic(db.session)
    if user_id:
        user_allowed_profile = user_instance.check_user_profile_match(user_id, profile_id, profile_name)
        if user_allowed_profile:
            links_data = request.json
            message, code = GetAllLinksData(db.session).update_links(links_data, links_group_id)
            return jsonify(message), code
        else:
            return jsonify({"error": "Something happened"}), 500
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@links_bp.route('/update-links-profile/<int:profile_id>/<string:profile_name>/<int:links_group_id>', methods=["PATCH"])
@jwt_required()
def update_links_profile(links_group_id, profile_id, profile_name):
    user_id = get_jwt_identity()
    user_instance = UserLogic(db.session)
    if user_id:
        user_allowed_profile = user_instance.check_user_profile_match(user_id, profile_id, profile_name)
        if user_allowed_profile:
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
            message, code = GetAllLinksData(db.session).update_profile_data(backend_data, links_group_id)
            return jsonify(message), code
        else:
            return jsonify({"error": "Something happened"}), 500
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@links_bp.route('/delete-link-group/<int:profile_id>/<string:profile_name>/<int:links_group_id>', methods=['DELETE'])
@jwt_required()
def delete_link_group(links_group_id, profile_name, profile_id):
    user_id = get_jwt_identity()
    user_instance = UserLogic(db.session)
    if user_id:
        user_allowed_profile = user_instance.check_user_profile_match(user_id, profile_id, profile_name)
        if user_allowed_profile:
            message, code = GetAllLinksData(db.session).delete_links_group_data(links_group_id)
            return jsonify(message), code
        else:
            return jsonify({"error": "Something happened"}), 500
    else:
        return jsonify({'message': 'User does not authenticated'}), 401


@links_bp.route('/<string:username>/<string:links_group_id>', methods=['GET'])
def get_shorten_url(username, links_group_id):
    try:
        chosen_link = GetAllLinksData(db.session).link_via_shorten_url(username, links_group_id)
        chosen_link_data = {
            "linksGroupImage": chosen_link.links_group_image if chosen_link.links_group_image else "",
            "linksGroupName": chosen_link.links_group_name,
            "shortDescription": chosen_link.short_description,
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

