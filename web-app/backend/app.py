from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from routes.auth import auth
# from routes.game import game
from routes.users import users, login_manager
from model import User, db
from config import Config

def create_app():
    
    app = Flask(__name__)
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})
    
    #configurations
    app.config.from_object(Config)
    
    #initialize login manager
    login_manager.init_app(app)
    
    #make the db
    db.init_app(app)
    with app.app_context():
        db.create_all()
        
    #make the blueprints
    app.register_blueprint(auth, url_prefix='/auth')
    # app.register_blueprint(game, url_prefix='/game')
    app.register_blueprint(users, url_prefix='/users')
    
    return app
    
#runs the backend APIs    
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)