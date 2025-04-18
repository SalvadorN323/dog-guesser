from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required, LoginManager
from model import User, db


users = Blueprint('users', __name__)
#initialize the login manager to be imported to the main app
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@users.route('/user', methods=['GET'])
@login_required
def get_user():
    # login manager has a function to authenticate users
    # print(current_user.is_authenticated)
    if current_user.is_authenticated:
        user = {
            'id': current_user.id,
            'email': current_user.email,
            'right_guesses': current_user.right_guesses
        }
        # print(user)
        return jsonify(user)
    else:
        return jsonify({'status':"User is not authenticated"})
    

@users.route('/all-users', methods=['GET'])
@login_required
def get_all_users():
    if current_user.is_authenticated:
        users = User.query.all()
        
        #array of objects
        users_list = [{
            'id': user.id,
            'email': user.email   
        } for user in users]
        
        print(users_list)
        return jsonify(users_list)
    else:
        return jsonify({'status':"You are not authenticated"})
        
        
                          
