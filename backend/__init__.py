import os
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta, timezone
from flask import Flask
from flask_mail import Mail, Message
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .ApiRoutes import init_links_routes
from .LoginRoutes import init_log_routes
from .ProfilesRoutes import init_profile_routes
from .Database.models import BlackListToken
from .config import DevelopmentConfig, ProductionConfig, TestingConfig
from .Database import db


jwt = JWTManager()
cors = CORS()
scheduler = BackgroundScheduler()
mail = Mail()


@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    token = db.session.query(BlackListToken).filter_by(jti=jti).first()
    return token is not None


def clean_blackList_tokens():
    threshold_date = datetime.now(timezone.utc) - timedelta(days=5)
    expired_tokens = db.session.query(BlackListToken).filter(BlackListToken.expires_at < threshold_date).all()
    for token in expired_tokens:
        db.session.delete(token)
    db.session.commit()
    print("Expired blacklist tokens cleaned up.")


scheduler.add_job(func=clean_blackList_tokens, trigger='interval', days=1)
scheduler.start()


def create_app(config_class=None):
    app = Flask(__name__, static_folder="../static")

    @app.before_request
    def init_scheduler():
        if not scheduler.running:
            scheduler.start()

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
    init_profile_routes(app)
    db.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})
    migrate = Migrate()
    migrate.init_app(app, db)
    with app.app_context():
        from .Database.models import LinksGroup
        db.create_all()
    return app
