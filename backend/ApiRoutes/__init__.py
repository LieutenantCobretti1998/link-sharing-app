from flask import Flask
from .LinksLogic.save_link import save_bp


def init_routes(app: Flask) -> None:
    app.register_blueprint(save_bp, url_prefix='/api')