import os
from datetime import timedelta


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = ['cookies']
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
    JWT_RESET_TOKEN_EXPIRES = timedelta(minutes=5)
    JWT_EMAIL_CONFIRM_TOKEN_EXPIRES = timedelta(minutes=2)
    JWT_COOKIES_CSRF_PROTECT = True
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=3)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = "static/groupImages"
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


class DevelopmentConfig(Config):
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=5)
    MAIL_PORT = 587
    JWT_COOKIE_SAMESITE = 'Lax'
    MAIL_USE_SSL = False
    MAIL_USE_TLS = True
    JWT_COOKIE_SECURE = False
    FRONTEND_URL = os.getenv('FRONTEND_DEV_URL')
    BASE_URL = os.getenv("BASE_API_DEV_URL")
    MAIL_USERNAME = os.environ.get('TEST_MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('TEST_MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = ("Link Sharing App", "djamil5099@gmail.com")
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL_DEV',
                                        "postgresql://postgres:Djamil25281998@localhost:5432/link_sharing_app_dev")


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL_PROD')
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False
    JWT_COOKIE_SAMESITE = "None"
    JWT_COOKIE_SECURE = True
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = ("Link Sharing App", "djamil5099@gmail.com")
    FRONTEND_URL = os.getenv('FRONTEND_PROD_URL')
    BASE_URL = os.getenv("BASE_API_PROD_URL")


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
