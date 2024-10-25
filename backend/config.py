import os
from datetime import timedelta


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_REFRESH_TOKEN_LOCATION = "api/token/refresh"
    JWT_COOKIE_SAMESITE = 'Lax'
    JWT_COOKIES_CSRF_PROTECT = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = "static/groupImages"
    ALLOWED_EXTENSIONS = {"png", "jpg"}


class DevelopmentConfig(Config):
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=10)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=3)
    JWT_COOKIE_SECURE = False
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL_DEV',
                                        "postgresql://postgres:Djamil25281998@localhost:5432/link_sharing_app_dev")


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///production.db')


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
