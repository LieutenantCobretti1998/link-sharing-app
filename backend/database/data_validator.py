from abc import ABC
from operator import truediv
from typing import Any

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from sqlalchemy.exc import OperationalError, NoResultFound
from werkzeug.security import check_password_hash


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

    def get_all_links(self, page: int, per_page: int) -> list:
        """
        :param page: int,
        :param per_page: int
        The method to get all data from the links database
        """
        try:
            from .models import LinksGroup
            offset_value = (page - 1) * per_page
            all_links = self.db_session.query(LinksGroup).offset(offset_value).limit(per_page).all()
            if not all_links:
                return []
            return all_links
        except OperationalError:
            raise OperationalError

    def link_via_shorten_url(self, username: str, links_group_id: str):
        """
        :param username: str,
        :param links_group_id: int,
        This method is checked the linksGroup chosen by users
        """
        try:
            from .models import LinksGroup
            link_group = self.db_session.query(LinksGroup).filter_by(shorten_url=f"http://localhost:5173/{username}/{links_group_id}").first()
            if not link_group:
                raise NoResultFound(f"LinksGroup with id {links_group_id} was not found")
            return link_group

        except OperationalError:
            raise OperationalError
    def all_links_count(self) -> int:
        """
        :return: int
        Check all available links in database
        """
        try:
            from .models import LinksGroup
            all_links = self.db_session.query(LinksGroup).count()
            return all_links
        except OperationalError:
            raise OperationalError

    def get_searched_links(self, page: int, per_page: int, search: str) -> list:
        """
        :param search: str,
        :param page: int,
        :param per_page: int
        :return: list
        The same as the get_all_links method but with search filter
        """
        try:
            from .models import LinksGroup
            offset_value = (page - 1) * per_page
            all_links = (
                self.db_session.query(LinksGroup).filter(
                    or_(
                        LinksGroup.links_group_name.ilike(f"%{search}%"),
                        LinksGroup.category.ilike(f"%{search}%"),
                    )
                )
                .offset(offset_value)
                .limit(per_page)
                .all())
            if not all_links:
                return []
            return all_links
        except OperationalError:
            raise OperationalError

    def all_searched_links_count(self, search) -> int:
        """
        :param search: str
        :return: int
        Check all available links in database
        """
        try:
            from .models import LinksGroup
            all_links = (self.db_session.query(LinksGroup)
            .filter(
                or_(
                    LinksGroup.links_group_name.ilike(f"%{search}%"),
                    LinksGroup.category.ilike(f"%{search}%"),
                )
            )).count()
            return all_links
        except OperationalError:
            raise OperationalError

    def get_links_group_data(self, links_group_id: int, preview: str = "No"):
        """
        the method which get the links group data from the links database based on the id
        :param links_group_id: int
        :param preview: str
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

    def update_links(self, links: list, links_group_id: int):
        """
        links: list
        links_group_id: int
        return:
        The method for links group update
        """
        try:
            from .models import LinksGroup
            chosen_link_group = self.db_session.query(LinksGroup).filter(LinksGroup.id == links_group_id)
            if not chosen_link_group:
                return {"error": "Not Found😒"}, 404
            chosen_link_group.update({"links": links})
            self.db_session.commit()
            return {"message": "Links updated successfully"}, 200
        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500

    def update_profile_data(self, profile_data: dict, links_group_id: int):
        try:
            from .models import LinksGroup
            chosen_link_group = self.db_session.query(LinksGroup).filter(LinksGroup.id == links_group_id).first()
            if not chosen_link_group:
                return {"error": "Not Found😒"}, 404
            for key, value in profile_data.items():
                setattr(chosen_link_group, key, value)
            self.db_session.commit()
            return {"message": "Profile updated successfully"}, 200

        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500

    def delete_links_group_data(self, links_group_id: int):
        try:
            from .models import LinksGroup
            chosen_link_group = self.db_session.query(LinksGroup).filter(LinksGroup.id == links_group_id).first()
            if not chosen_link_group:
                return {"error": "Not Found😒"}, 404
            self.db_session.delete(chosen_link_group)
            self.db_session.commit()
            return {"message": "LinksGroup deleted successfully"}, 200

        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500

class UserLogic(AbstractDataValidator):
    def __init__(self, db_session):
        super().__init__(db_session)

    def check_user(self, password: str, username: str) -> Any | None:
        """
        password: str,
        username: str,
        return: Any | None
        Check if the user exists and then log it in
        """
        from .models import User
        user = self.db_session.query(User).filter(User.email == username).first()
        if user and check_password_hash(pwhash=password, password=password):
            return user
        else:
            return None

    def find_user(self, username: str) -> bool:
        """
        username: str
        return: bool
        Checking user existence
        """
        from .models import Profile
        user_exist = self.db_session.query(Profile).filter(Profile.username == username).first()
        if user_exist:
            return True
        else:
            return False

    def find_email(self, email: str) -> bool | list:
        """
                email: str
                return: bool
                Checking user existence
                """
        from .models import User
        user_exist = self.db_session.query(User).filter(User.email == email).first()
        if user_exist:
            return user_exist
        else:
            return False

    def create_user(self, username:str, **kwargs) -> tuple:
        """
        username: str
        **kwargs
        return: tuple
        Create a user method
        """
        try:
            from .models import User, Profile
            existed_user = self.find_email(kwargs["email"])
            if not existed_user:
                new_user = User()
                for key, value in kwargs.items():
                    if hasattr(new_user, key):
                        setattr(new_user, key, value)
                self.db_session.flush()
                new_profile = Profile(username=username, user_id=new_user.id)
                self.db_session.add(new_user, new_profile)
                self.db_session.commit()
                return {"message": "User created successfully"}, 200
            else:
                print(existed_user.can_create_profile())
                if existed_user.can_create_profile():
                    new_profile = Profile(username=username, user_id=existed_user)
                    self.db_session.add(new_profile)
                    self.db_session.commit()
                    return {"message": "User created successfully"}, 200
                else:
                    return {"message": "Maximum capacity of users reached"}, 409
        except OperationalError:
            self.db_session.rollback()
            return {"message": "Database Fatal Error"}, 500