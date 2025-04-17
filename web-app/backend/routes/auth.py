from flask import Flask, Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, logout_user, login_required
import bcrypt
from model import User, db

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST', 'GET'])
def login():
    data = request.get_json()
    # print(data)
    
    email = data['email']
    password = data['password']
    
    user = User.query.filter_by(email=email).first()
    print(user.hashed_password)
    print(password)
    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user.hashed_password.encode('utf-8')):
            login_user(user)
            return jsonify({'status': "success"})
    else:
        return jsonify({'status': "Account does not exist, please register"})
    
    return jsonify({'status': "Wrong password or email"})
     
        

    
@auth.route('/register', methods=['POST', 'GET'])
def register():
    data = request.get_json()
    
    email = data['email']
    password = data['password']
    confirmed_password = data['confirmed_password']
    
    if confirmed_password != password:
        return jsonify({'status': "Confirmed password and password didn't match"})
        
    user = User.query.filter_by(email=email).first()
    
    if user:
        return jsonify({'status': "Account already exists"})
    else:
        
        new = User(email=email, hashed_password=password, right_guesses=0)
        new.create_hash(password)
        db.session.add(new)
        db.session.commit()
        return jsonify({'status':"Registered successfully!"})
    

@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'status': "You have successfully logged out!"})