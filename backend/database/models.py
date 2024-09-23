import random
import string
from sqlalchemy import Column, Integer, String, DateTime, JSON
from backend.database import Base, db
import os

class LinksGroup(Base):
    __tablename__ = 'links_group'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, default=db.func.current_timestamp())
    shorten_url = Column(String(20), unique=True, nullable=False)
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
            domain = "http://localhost:5173/"
    return f'{domain}{random_str}'


def generate_short_unique_url(database) -> str:
    """
    database:
    Generate url until it found it
    :return: str
    """
    short_url = generate_short_url()
    while database.session.query(LinksGroup).filter(LinksGroup.shorten_url == short_url).first() is not None:
        short_url = generate_short_url()
    return short_url
