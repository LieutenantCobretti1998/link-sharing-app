from backend import create_app
from flask_cors import CORS
app = create_app()
CORS(app, origins=["http://localhost:5174"])

if __name__ == '__main__':
    app.run()
