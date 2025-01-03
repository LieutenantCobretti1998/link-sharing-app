from abc import ABC
from typing import Any
from sqlalchemy import or_
from sqlalchemy.exc import OperationalError, NoResultFound
from werkzeug.security import check_password_hash
from ..exceptions import DeleteUserError
from flask import current_app as app


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

    def get_all_links(self, page: int, per_page: int, profile_id: int) -> list:
        """
        :param profile_id: int
        :param page: int,
        :param per_page: int
        The method to get all data from the links Database
        """
        try:
            from .models import LinksGroup
            offset_value = (page - 1) * per_page
            all_links = self.db_session.query(LinksGroup).filter(LinksGroup.profile_id == profile_id).offset(
                offset_value).limit(per_page).all()
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
            link_group = self.db_session.query(LinksGroup).filter_by(
                shorten_url=f"{app.config['FRONTEND_URL']}{username}/{links_group_id}").first()
            if not link_group:
                raise NoResultFound(f"LinksGroup with id {links_group_id} was not found")
            return link_group

        except OperationalError:
            raise OperationalError

    def all_links_count(self, profile_id: int) -> int:
        """
        :param profile_id: int
        :return: int
        Check all available links in Database
        """
        try:
            from .models import LinksGroup
            all_links = self.db_session.query(LinksGroup).filter(LinksGroup.profile_id == profile_id).count()
            return all_links
        except OperationalError:
            raise OperationalError

    def get_searched_links(self, page: int, per_page: int, search: str, profile_id: int) -> list:
        """
        :param profile_id: int
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
                    LinksGroup.profile_id == profile_id,
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

    def all_searched_links_count(self, search, profile_id: int) -> int:
        """
        :param profile_id: int
        :param search: str
        :return: int
        Check all available links in Database
        """
        try:
            from .models import LinksGroup
            all_links = (self.db_session.query(LinksGroup)
            .filter(
                LinksGroup.profile_id == profile_id,
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
        the method which get the links group data from the links Database based on the id
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

    def confirm_invalidate_email(self, email: str):
        """
        :param email: str
        :return:
        """
        try:
            from .models import User
            existed_inactive_user = self.db_session.query(User).filter(User.email == email, User.is_active == False).first()
            if existed_inactive_user:
                existed_inactive_user.is_active = True
                self.db_session.commit()
                return existed_inactive_user.id, {"message": "Email is active. Please, return to login page"}, 200
            else:
                return {"message": "User is not found"}, 404
        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500

    def check_user(self, password: str, email: str) -> Any | None:
        """
        password: str,
        username: str,
        return: Any | None
        Check if the user exists and then log it in
        """
        from .models import User
        user = self.db_session.query(User).filter(User.email == email, User.is_active == True).first()
        if user and check_password_hash(pwhash=user.password, password=password):
            return user
        else:
            return None

    def check_user_profile_match(self, user_id: int, profile_id: int, profile_name: str) -> bool:
        """
        :param user_id: int
        :param profile_name: str
        :param profile_id: int
        :return: bool
        Check if the user could use profile id
        """
        from .models import Profile
        is_allowed = self.db_session.query(Profile).filter(Profile.id == profile_id, Profile.user_id == user_id,
                                                           Profile.username == profile_name).first()
        if is_allowed:
            return True
        else:
            return False

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

    def find_profile(self, profile_name: str, user_id: int) -> tuple:
        """
        :param profile_name: str
        :param user_id: int
        :return: tuple
        Chosen profile and its data
        """
        from .models import Profile, User
        current_user = self.db_session.query(User).filter(User.id == user_id).first()
        chosen_profile = self.db_session.query(Profile).filter(Profile.username == profile_name).first()
        if chosen_profile and current_user:
            return {"profile_name": chosen_profile.username, "profile_id": chosen_profile.id,
                    "current_user": current_user.email, "profile_bio": chosen_profile.bio_description}, {"message": "Profile is loaded successfully"}, 200
        else:
            return None, {"message": "Profile or User is not existed"}, 404

    def find_related_profiles(self, user_id: int) -> tuple:
        """
        :param user_id: int
        :return: tuple
        """
        try:
            from .models import User
            user = self.db_session.query(User).filter_by(id=user_id).first()
            if user:
                profiles = []
                for profile in user.profiles:
                    profiles.append({
                        "username": profile.username,
                    })
                user_data = {
                    "email": user.email,
                    "profiles": profiles,
                }
                return {"user": user_data}, 200
            else:
                return None, {"message": "User is not existed"}, 404
        except OperationalError:
            return None, {"error": "Database Fatal Error"}, 500

    def find_email(self, email: str) -> bool:
        """
                email: str
                return: bool
                Checking user existence
                """
        from .models import User
        user_exist = self.db_session.query(User).filter(User.email == email, User.is_active == True).first()
        if user_exist:
            return user_exist
        else:
            return False

    def find_inactive_email(self, email: str) -> bool:
        """
        :param email:
        :return: bool
        Check inactive users and if the email is the same just update their passwords
        """
        from .models import User
        inactive_user_exist = self.db_session.query(User).filter(User.email == email).first()
        if inactive_user_exist:
            return inactive_user_exist
        return False

    def create_user(self, **kwargs) -> tuple:
        """
        **kwargs
        return: tuple
        Create a user method
        """
        try:
            from .models import User, Profile
            existed_user = self.find_email(kwargs["email"])
            if not existed_user:
                inactive_user = self.find_inactive_email(kwargs["email"])
                if inactive_user:
                    for key, value in kwargs.items():
                        if hasattr(inactive_user, key):
                            setattr(inactive_user, key, value)
                    self.db_session.commit()
                    return {"message": "User created successfully", "email": kwargs["email"]}, 200
                new_user = User()
                for key, value in kwargs.items():
                    if hasattr(new_user, key):
                        setattr(new_user, key, value)
                self.db_session.add(new_user)
                self.db_session.commit()
                return {"message": "User created successfully", "email": kwargs["email"]}, 200
            else:
                return {"message": "User Already exists"}, 409
        except OperationalError:
            self.db_session.rollback()
            return {"message": "Database Fatal Error"}, 500

    def update_password(self, user_id: int, new_password: str) -> tuple:
        """
        :param user_id: int
        :param new_password: str
        :return: tuple
        The method for updating the password
        """
        try:
            from .models import User
            user = self.db_session.query(User).filter_by(id=user_id).first()
            if user:
                user.password = new_password
                self.db_session.commit()
                return {"message": "Password updated successfully"}, 200
            else:
                return {"message": "User is not existed"}, 404
        except OperationalError:
            self.db_session.rollback()
            return {"message": "Database Fatal Error"}, 500

    def create_profile(self, user_id: int, **kwargs) -> tuple:
        """
        :param user_id: int
        :return:
        The method for profile creation
        """
        try:
            from .models import User, Profile
            existed_user = self.db_session.query(User).filter(User.id == user_id).first()
            existed_profile = self.db_session.query(Profile).filter(Profile.username == kwargs["username"]).first()
            if existed_user and kwargs["username"]:
                if not existed_user.can_create_profile():
                    return {"message": "Maximum capacity of users reached"}, 409
                if existed_profile:
                    return {"message": "Profile already exists"}, 409
                new_profile = Profile(username=kwargs["username"], user_id=user_id)
                self.db_session.add(new_profile)
                self.db_session.commit()
                return {"message": "Profile created successfully", "username": kwargs["username"]}, 200
        except OperationalError:
            self.db_session.rollback()
            return {"message": "Database Fatal Error"}, 500

    def update_profile_name(self, profile_id: int, profile_name: str, updated_name: str) -> tuple:
        """
        :param updated_name: str
        :param profile_id: int
        :param profile_name: str
        :return:
        The method for updating profile name
        """
        try:
            from .models import Profile
            user = self.db_session.query(Profile).filter(Profile.id == profile_id,
                                                         Profile.username == profile_name).first()
            if user:
                profile_exist = self.db_session.query(Profile).filter(Profile.username == updated_name).first()
                if profile_exist:
                    return {"error": "Profile already exists"}, 409
                user.username = updated_name
                self.db_session.commit()
                return {"message": "Profile name updated successfully", "new_name": updated_name}, 200
            else:
                return {"error": "Profile does not exist"}, 409
        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500

    def update_profile_bio(self, profile_id: int, profile_name: str, profile_bio: str) -> tuple:
        """
        :param profile_bio: str
        :param profile_id: int
        :param profile_name: str
        :return:
        The method for updating profile name
        """
        try:
            from .models import Profile
            user = self.db_session.query(Profile).filter(Profile.id == profile_id,
                                                         Profile.username == profile_name).first()
            if user:
                user.bio_description = profile_bio
                self.db_session.commit()
                return {"message": "Profile bio updated successfully", "new_bio": profile_bio}, 200
            else:
                return {"error": "Profile does not exist"}, 409
        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500

    def delete_profile(self, profile_id: int, profile_name: str) -> tuple:
        """
        :param profile_id: int
        :param profile_name: str
        :return: tuple
        Method for deleting the corresponding profile
        """
        try:
            from .models import Profile
            user = self.db_session.query(Profile).filter(Profile.id == profile_id,
                                                         Profile.username == profile_name).first()
            if user:
                self.db_session.delete(user)
                self.db_session.commit()
                return {"message": "Profile deleted successfully"}, 200
            else:
                return {"message": "Profile does not exist"}, 409

        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500

    def delete_bio(self, profile_id: int, profile_name: str) -> tuple:
        """
        :param profile_id: int
        :param profile_name: str
        :return: tuple
        Method for deleting the corresponding profile
        """
        try:
            from .models import Profile
            user = self.db_session.query(Profile).filter(Profile.id == profile_id,
                                                         Profile.username == profile_name).first()
            if user:
                user.bio_description = None
                self.db_session.commit()
                return {"message": "Bio description deleted successfully"}, 200
            else:
                return {"message": "Profile does not exist"}, 409

        except OperationalError:
            self.db_session.rollback()
            return {"error": "Database Fatal Error"}, 500

    def delete_account(self, user_id: int) -> tuple:
        """
        :param user_id: int
        Method for deleting the corresponding account
        """
        try:
            from .models import User
            user = self.db_session.query(User).filter(User.id == user_id, User.is_active == True).first()

            if user:
                self.db_session.delete(user)
                self.db_session.commit()
                return {"message": "User deleted successfully"}, 200
            else:
                raise DeleteUserError("User does not exist", 409)

        except OperationalError:
            self.db_session.rollback()
            raise DeleteUserError("Database Fatal Error", 500)

