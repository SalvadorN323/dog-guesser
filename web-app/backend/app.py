from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from routes import auth, game
from model import User, db
from config import Config

def create_app():
    
    app = Flask(__name__)
    CORS(app, resources={r'*': {'origins': '*'}}, supports_credentials=True)
    
    #configurations
    app.config.from_object(Config)
    
    #initialize login manager
    login_manager = LoginManager()
    login_manager.init_app(app)
    
    #make the db
    db.init_app(app)
    with app.app_context():
        db.create_all()
        
    #get user
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
        
    #make the blueprints
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(game, url_prefix='/game')
    
    return app
    
#runs the backend APIs    
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)