from flask import Blueprint, jsonify, request

save_bp = Blueprint('save', __name__)


@save_bp.route('/save_link', methods=['POST'])
def save_link():
    data = request.get_json()
    print(data)
    return jsonify(data)

