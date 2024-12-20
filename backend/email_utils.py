from flask_mail import Message
from flask import current_app


def send_mail(recipient: str, subject: str, body: str = None, html: str = None):
    """
    :param html: str
    :param recipient: str
    :param subject: str
    :param body: str
    :return: None
    The function for sending a message when password is resetting
    """
    msg = Message(
        subject=subject,
        recipients=[recipient],
        body=body,
        html=html,
        sender="djamil5099@gmail.com"
    )
    mail = current_app.extensions["mail"]
    if not mail:
        raise RuntimeError("Mail is not initialized. Ensure Flask-Mail is set up correctly.")
    try:
        mail.send(msg)
        current_app.logger.info(f"Sending email to {recipient}")
    except Exception as e:
        current_app.logger.error(e)
