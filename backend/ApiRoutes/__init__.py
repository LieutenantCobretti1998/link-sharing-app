from flask import Flask
from .LinksLogic.save_link import save_bp
from .LinksLogic.get_links import links_bp

def init_routes(app: Flask) -> None:
    app.register_blueprint(save_bp, url_prefix='/api')
    app.register_blueprint(links_bp, url_prefix='/api')