from flask_jwt_extended import JWTManager
from backend import create_app
from flask_cors import CORS
app = create_app()


if __name__ == '__main__':
    app.run()
