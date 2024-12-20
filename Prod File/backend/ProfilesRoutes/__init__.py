from flask import Flask
from .ProfileLogic.profiles import profiles_bp


def init_profile_routes(app: Flask) -> None:
    app.register_blueprint(profiles_bp, url_prefix='/api')