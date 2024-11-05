import base64
import os
import uuid
from flask import current_app as app
from werkzeug.utils import secure_filename


def get_file_extension(base_64_string: str) -> str:
    """
    Small helper function for getting the image extension from user's image
    :param base_64_string:
    :return: str
    """
    mime_type = base_64_string.split(';')[0].split('/')[1]
    extension = mime_type.split('/')[-1]
    if extension not in app.config['ALLOWED_EXTENSIONS']:
        raise ValueError
    return extension


def save_base64_image(base64_string: str) -> str:
    """
    Small helper function for saving the image base64 string
    :param base64_string:
    :return:
    """
    file_extension = get_file_extension(base64_string)
    print(app.config['BASE_URL'])
    random_filename = f"{uuid.uuid4()}.{file_extension}"
    image_data = base64.b64decode(base64_string.split(',')[1])
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(random_filename))
    normed_path = os.path.normpath(file_path).replace("\\", "/")
    full_url = f"{app.config['BASE_URL']}/{normed_path}"
    with open(normed_path, 'wb') as f:
        f.write(image_data)
    return full_url


def format_links_data(link: any) -> dict:
    """
    :param link: any
    :return: dict
    Just reduce the amount of code in the main get all links router
    """
    return {
        "id": link.id,
        ""
        "linksGroupImage": link.links_group_image if link.links_group_image else "",
        "linksGroupName": link.links_group_name,
        "textColor": link.text_color,
        "commonColor": link.common_color,
        "backgroundColor": link.background_color,
        "backgroundImage": link.background_image,
        "category": link.category,
        "links": link.links
    }
