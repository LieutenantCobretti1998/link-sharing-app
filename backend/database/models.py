import random
import string
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, DateTime, JSON, VARCHAR, ForeignKey
from sqlalchemy.orm import relationship

from backend.database import Base, db
import os


class User(Base, UserMixin):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(VARCHAR, unique=True, nullable=False)
    password = db.Column(VARCHAR(), nullable=False, unique=False)
    role = Column(VARCHAR(20), nullable=False, default='user')
    profiles = relationship("Profile", backref="user", cascade="all, delete", lazy=True)

    def can_create_profile(self):
        return len(self.profiles) < 3

class Profile(Base):
    __tablename__ = 'profiles'
    id = Column(Integer, primary_key=True)
    username = Column(VARCHAR(25), unique=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

class LinksGroup(Base):
    __tablename__ = 'links_group'
    id = Column(Integer, primary_key=True)
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


def generate_short_url(length=6, domain=None) -> str:
    """
    The simple generator of unique 6 lettered identifier for the shorten url
    :param domain:
    :param length:
    :return: string
    """
    characters = string.ascii_letters + string.digits
    random_str = ''.join(random.choice(characters) for _ in range(length))
    if domain is None:
        if os.getenv("FLASK_ENV") == "development":
            domain = "http://localhost:5173/jamil/"
    return f'{domain}{random_str}'


def generate_short_unique_url(database) -> str:
    """
    Generate url until it found it
    :return: str
    """
    short_url = generate_short_url()
    while database.query(LinksGroup).filter(LinksGroup.shorten_url == short_url).first() is not None:
        short_url = generate_short_url()
    return short_url
