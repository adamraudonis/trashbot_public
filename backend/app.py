import os
from flask import Flask, request, make_response
import cachecontrol
from google.oauth2 import id_token
import google.auth.transport.requests
import requests
from dynamo import setup_dynamo_db
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

ddb = setup_dynamo_db()

email_of_controlling_user = ''

client_id = os.environ.get('OATH_CLIENT_ID')
if client_id is None:
    raise Exception("OATH_CLIENT_ID was none!")


# NOTE: This route is needed for the default EB health check route later
@app.route('/')
def home():
    return "ok"


@app.route('/api/list_users')
def list_users():
    if not is_admin():
        return dict(error="Must be admin")

    return ddb.scan('trashbot_users')['Items']


@app.route('/api/set_controlling_user')
def set_controlling_user():
    if not is_admin():
        return dict(error="Must be admin")

    global email_of_controlling_user
    email_of_controlling_user = request.args['email']
    return dict(status='ok')


@app.route('/api/login')
def login():
    req = google.auth.transport.requests.Request()
    token = request.headers.get('token')
    info = id_token.verify_oauth2_token(token, req, client_id)

    result = ddb.query(
        'SELECT * FROM "trashbot_users" WHERE email=?', [info['email']])
    if not result:
        result = ddb.query(
            "INSERT INTO \"trashbot_users\" value {'email' : ?,'token' : ?, 'name': ?, 'role': 'user'}",
                           [info['email'],info['token'],info['name']])
        
    resp = make_response(result)
    resp.set_cookie('token', token, httponly=True)
    return resp


@app.route('/api/logout')
def logout():
    resp = make_response(dict(status='ok'))
    resp.set_cookie('token', '', httponly=True)
    return resp


# TODO: Add the socketio route here
def is_admin():
    user_info = get_current_user()
    if user_info is None:
        return False
    if user_info['role'] != 'admin':
        return False    
    return True


def get_current_user():

    # // See if the user's token is cached in local storage
    # const token = localStorage.getItem('token');
    # if (token) {
    #   const decodedToken: any = jwtDecode(token);
    #   const currentTime = Math.floor(Date.now() / 1000);
    #   if (currentTime > decodedToken.exp || 0) {
    #   } else {
    #     user = decodedToken.name;
    #   }
    token = request.cookies.get('token')
    if token is None:
        return None
    
    req = google.auth.transport.requests.Request()
    info = id_token.verify_oauth2_token(token, req, client_id)
    return info


if __name__ == '__main__':
    app.run(debug=True, port=8080)