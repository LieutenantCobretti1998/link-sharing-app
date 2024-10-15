import os
from flask import Flask
from flask_migrate import Migrate
from .ApiRoutes import init_links_routes
from .LoginRoutes import init_log_routes
from .config import DevelopmentConfig, ProductionConfig, TestingConfig
from .database import db
from .extensions import login_manager


def create_app(config_class=None):
    app = Flask(__name__, static_folder="../static")
    # Get the environment from the FLASK_ENV variable (default to 'development')
    if not config_class:
        env = os.getenv('FLASK_ENV', 'development')
        if env == 'development':
            config_class = DevelopmentConfig
        elif env == 'production':
            config_class = ProductionConfig
        elif env == 'testing':
            config_class = TestingConfig
        else:
            config_class = DevelopmentConfig

    # Load the configuration
    app.config.from_object(config_class)
    init_links_routes(app)
    init_log_routes(app)
    login_manager.init_app(app)
    db.init_app(app)
    migrate = Migrate()
    migrate.init_app(app, db)
    with app.app_context():
        from .database.models import LinksGroup
        db.create_all()
    return app
