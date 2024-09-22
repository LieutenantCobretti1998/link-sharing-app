from sqlalchemy import Column, Integer, String, DateTime, JSON
from backend.database import Base, db


class LinksGroup(Base):
    __tablename__ = 'links_group'
    id = Column(Integer, primary_key=True)
    original_url = Column(String(2048), nullable=False)
    short_url = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=db.func.current_timestamp())
    clicks = Column(Integer, default=0)
    links = Column(JSON, nullable=True)
    links_group_image = Column(String(512), nullable=True)
    links_group_name = Column(String(255), nullable=False)
    short_description = Column(String(512), nullable=True)
    category = Column(String(255), nullable=False)
    text_color = Column(String(7), nullable=True)
    common_color = Column(String(7),nullable=True)
    background_color = Column(String(7), nullable=True)
    background_image = Column(String(512), nullable=True)
    blended_color = Column(String(7), nullable=True)

