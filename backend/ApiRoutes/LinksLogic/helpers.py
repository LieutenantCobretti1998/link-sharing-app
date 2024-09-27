import base64
import os
import uuid
from pathlib import Path
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
    random_filename = f"{uuid.uuid4()}.{file_extension}"
    image_data = base64.b64decode(base64_string.split(',')[1])
    print(Path(app.config['UPLOAD_FOLDER']))
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(random_filename))
    normed_path = os.path.normpath(file_path).replace("\\", "/")
    with open(normed_path, 'wb') as f:
        f.write(image_data)
    return normed_path
