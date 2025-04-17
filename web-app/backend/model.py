from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import bcrypt

#initializing db
db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'User'
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    hashed_password = db.Column(db.String(150), unique=True, nullable=False)
    right_guesses = db.Column(db.Integer, nullable=False)
    
    def create_hash(self, hash_password):
        self.hashed_password = bcrypt.hashpw(hash_password.encode('utf-8'), bcrypt.gensalt()).decode()
        
        
class Dog(db.Model):
    __tablename__ = 'Dog'
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    dog_breed = db.Column(db.String(100), nullable=False)
    dog_breed_url = db.Column(db.String(450), unique=True, nullable=False)
        