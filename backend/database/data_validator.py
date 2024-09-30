from abc import ABC
from sqlalchemy.exc import OperationalError, NoResultFound


class AbstractDataValidator(ABC):
    def __init__(self, db_session):
        self.db_session = db_session


class SaveLinksData(AbstractDataValidator):
    def __init__(self, links_dict, db_session):
        super().__init__(db_session)
        self.links_dict = links_dict

    def save_links(self) -> tuple[dict[str, str], int]:
        """
        :return: dict(str, int)
        """
        try:
            from .models import LinksGroup
            new_link = LinksGroup(**self.links_dict)
            self.db_session.add(new_link)
            self.db_session.commit()
            return {"message": "Links saved successfully"}, 200
        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500


class GetAllLinksData(AbstractDataValidator):
    def __init__(self, db_session):
        super().__init__(db_session)

    def get_all_links(self) -> list:
        """
        The method to get all data from the links database
        """
        try:
            from .models import LinksGroup
            all_links = self.db_session.query(LinksGroup).all()
            if not all_links:
                return []
            return all_links
        except OperationalError:
            raise OperationalError

    def get_links_group_data(self, links_group_id: int):
        """
        the method which get the links group data from the links database based on the id
        :param links_group_id:
        :return:
        """
        try:
            from .models import LinksGroup
            chosen_link_group = self.db_session.query(LinksGroup).filter(LinksGroup.id == links_group_id).first()
            if not chosen_link_group:
                raise NoResultFound(f"LinksGroup with id {links_group_id} was not found")
            return chosen_link_group
        except OperationalError:
            raise OperationalError
