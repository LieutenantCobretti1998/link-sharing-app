from flask import Flask
from .LoginLogic.create_user import create_user_bp
from .LoginLogic.login import login_bp


def init_log_routes(app: Flask) -> None:
    app.register_blueprint(create_user_bp, url_prefix='/api')
    app.register_blueprint(login_bp, url_prefix='/api')
