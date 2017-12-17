import os
from collections import Counter

from flask import Flask, redirect, render_template, request, session
from flask.json import jsonify
from requests_oauthlib import OAuth2Session

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

CLIENT_ID = os.getenv('INSTAGRAM_CLIENT_ID')
CLIENT_SECRET = os.getenv('INSTAGRAM_CLIENT_SECRET')
AUTHORIZATION_BASE_URL = 'https://api.instagram.com/oauth/authorize/'
TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
REDIRECT_URI = 'http://localhost:5001/authed'
API_PATH = 'https://api.instagram.com/v1'


def instagram_api(token=None):
    instagram = OAuth2Session(CLIENT_ID, state=session['oauth_state'],
                              token=token, redirect_uri=REDIRECT_URI)
    instagram._client.default_token_placement = 'query'
    return instagram


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login')
def login():
    instagram = OAuth2Session(CLIENT_ID, redirect_uri=REDIRECT_URI)
    authorization_url, state = instagram.authorization_url(
        AUTHORIZATION_BASE_URL)

    # State is used to prevent CSRF, keep this for later.
    session['oauth_state'] = state
    return redirect(authorization_url)


@app.route("/authed")
def callback():
    instagram = instagram_api()
    token = instagram.fetch_token(TOKEN_URL, client_secret=CLIENT_SECRET,
                                  authorization_response=request.url)

    session['oauth_token'] = token

    return render_template('index.html')


@app.route("/like-counts")
def like_counts():
    instagram = instagram_api(token=session['oauth_token'])
    data = instagram.get(API_PATH + '/users/self/media/recent/').json()

    all_post_likes = []

    for post_id in data_to_ids(data):
        post_likes = instagram.get(API_PATH + '/media/{}/likes'.format(post_id)).json()['data']
        all_post_likes += post_likes

    username_list = [l['username'] for l in all_post_likes]

    return jsonify(Counter(username_list))


@app.route("/instagram-oauth-token")
def instagram_oauth_token():
    return jsonify(session.get('oauth_token'))


def data_to_ids(data):
    posts = data['data']
    return [p['id'] for p in posts if p['likes']['count'] > 0]
