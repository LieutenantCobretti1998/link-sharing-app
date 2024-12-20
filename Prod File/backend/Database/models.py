import random
import string
from datetime import datetime, timezone
from flask_jwt_extended import create_access_token, decode_token
from flask import current_app as app
from sqlalchemy import Column, Integer, String, DateTime, JSON, VARCHAR, ForeignKey, BOOLEAN
from sqlalchemy.orm import relationship
from backend.Database import Base, db
import os


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(VARCHAR, unique=True, nullable=False)
    password = db.Column(VARCHAR(), nullable=False, unique=False)
    is_active = Column(BOOLEAN, default=False, nullable=False)
    registered_time = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
    role = Column(VARCHAR(20), nullable=False, default='user')
    profiles = relationship("Profile", backref="user", cascade="all, delete", lazy=True)

    def can_create_profile(self):
        return len(self.profiles) < 3


class Profile(Base):
    __tablename__ = 'profiles'
    id = Column(Integer, primary_key=True)
    username = Column(VARCHAR(25), unique=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    link_groups = relationship("LinksGroup", backref="profile", cascade="all, delete", lazy=True)


class LinksGroup(Base):
    __tablename__ = 'links_group'
    id = Column(Integer, primary_key=True)
    profile_id = Column(Integer, ForeignKey('profiles.id'), nullable=False)
    created_at = Column(DateTime, default=db.func.current_timestamp())
    shorten_url = Column(String(100), unique=True, nullable=False)
    clicks = Column(Integer, default=0)
    links = Column(JSON, nullable=True)
    links_group_image = Column(String(512), nullable=True)
    links_group_name = Column(String(255), nullable=False)
    short_description = Column(String(512), nullable=True)
    category = Column(String(255), nullable=False)
    text_color = Column(String(20), nullable=True)
    common_color = Column(String(20), nullable=True)
    background_color = Column(String(20), nullable=True)
    background_image = Column(String(512), nullable=True)
    blended_color = Column(String(20), nullable=True)


class BlackListToken(Base):
    __tablename__ = 'blacklist'
    id = Column(Integer, primary_key=True)
    jti = Column(String(36), nullable=False)
    user_id = Column(Integer, nullable=True)
    expires_at = Column(DateTime, nullable=False)

    def __init__(self, jti, expires_at, user_id=None, **kw):
        super().__init__(**kw)
        self.jti = jti
        self.expires_at = expires_at
        self.user_id = user_id

    def __repr__(self):
        return f'<BlacklistToken {self.jti}>'


def generate_short_url(user_profile: str, length=6, domain=None) -> str:
    """
    The simple generator of unique 6 lettered identifier for the shorten url
    :param domain:
    :param user_profile: str
    :param length: int
    :return: str
    """
    characters = string.ascii_letters + string.digits
    random_str = ''.join(random.choice(characters) for _ in range(length))
    if domain is None:
            domain = f"{app.config['FRONTEND_URL']}/{user_profile}/"
    return f'{domain}{random_str}'


def generate_short_unique_url(database, user_profile: str) -> str:
    """
    Generate url until it found it
    :return: str
    """
    short_url = generate_short_url(user_profile=user_profile)
    while database.query(LinksGroup).filter(LinksGroup.shorten_url == short_url).first() is not None:
        short_url = generate_short_url(user_profile=user_profile)
    return short_url


def generate_reset_token(user_id: int) -> str:
    """
    :param user_id: int
    :return: str
    Generate reset token for forget password logic
    """
    return create_access_token(identity=user_id,
                               expires_delta=app.config['JWT_RESET_TOKEN_EXPIRES']
                               )


def generate_email_confirm_token(email: str) -> str:
    """
    :param email: str
    :return:
    Generate email validation token for new users
    """
    return create_access_token(identity=email, expires_delta=app.config['JWT_EMAIL_CONFIRM_TOKEN_EXPIRES'])


def verify_reset_token(token: str):
    """
    :param token: str
    :return:
    The function for checking the validation of reset token
    """
    try:
        data = decode_token(token)
        jti = data["jti"]
        user_id = data["sub"]
        if db.session.query(BlackListToken).filter(BlackListToken.jti == jti).first():
            return False
        return user_id
    except Exception as e:
        return None


def verify_email_confirmation_token(token: str):
    """
    :param token: str
    :return:
    The function for checking the validation of email confirmation token
    """
    try:
        data = decode_token(token)
        jti = data["jti"]
        email = data["sub"]
        if db.session.query(BlackListToken).filter(BlackListToken.jti == jti).first():
            return False
        return email
    except Exception as e:
        return None