from abc import ABC
from sqlalchemy.exc import OperationalError

from models import LinksGroup


class AbstractDataValidator(ABC):
    def __init__(self, db_session):
        self.db_session = db_session


class SaveLinksDava(AbstractDataValidator):
    def __init__(self, db_session, links_dict):
        super().__init__(db_session)
        self.links_dict = links_dict

    def save_links(self) -> tuple[dict[str, str], int]:
        """
        :return: dict(str, int)
        """
        try:
            new_link = LinksGroup(**self.links_dict)
            self.db_session.add(new_link)
            self.db_session.commit()
            return {"message": "Links saved successfully"}, 200
        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500
