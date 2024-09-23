from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from .configuration_map import map_frontend_to_backend
from .data_validator import SaveLinksDava

class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)
