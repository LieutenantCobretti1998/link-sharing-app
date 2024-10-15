from flask import Flask
from .LoginLogic.create_user import create_user_bp


def init_log_routes(app: Flask) -> None:
    app.register_blueprint(create_user_bp, url_prefix='/api')
