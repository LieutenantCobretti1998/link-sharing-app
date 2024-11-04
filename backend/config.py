import os
from datetime import timedelta


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = ['cookies']
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = 587
    MAIL_USE_SSL = False
    MAIL_USE_TLS = True
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
    JWT_RESET_TOKEN_EXPIRES = timedelta(minutes=5)
    JWT_REFRESH_TOKEN_LOCATION = "api/token/refresh"
    JWT_COOKIE_SAMESITE = 'Lax'
    JWT_COOKIES_CSRF_PROTECT = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = "static/groupImages"
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


class DevelopmentConfig(Config):
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=3)
    JWT_COOKIE_SECURE = False
    MAIL_USERNAME = os.environ.get('TEST_MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('TEST_MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = ("Link Sharing App", "djamil5099@gmail.com")
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL_DEV',
                                        "postgresql://postgres:Djamil25281998@localhost:5432/link_sharing_app_dev")


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///production.db')


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
