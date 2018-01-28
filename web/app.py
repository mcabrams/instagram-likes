import os
from collections import Counter

from flask import Flask, abort, redirect, render_template, request, session
from flask.json import jsonify
from requests_oauthlib import OAuth2Session

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

CLIENT_ID = os.getenv('INSTAGRAM_CLIENT_ID')
CLIENT_SECRET = os.getenv('INSTAGRAM_CLIENT_SECRET')
AUTHORIZATION_BASE_URL = 'https://api.instagram.com/oauth/authorize/'
TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
REDIRECT_URI = os.getenv('REDIRECT_URI')
API_PATH = 'https://api.instagram.com/v1'


def instagram_api(token=None):
    if not session.get('oauth_state'):
        abort(401)

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


@app.route('/logout')
def logout():
    session['oauth_token'] = None
    return redirect('/')


@app.route("/authed")
def callback():
    instagram = instagram_api()
    token = instagram.fetch_token(TOKEN_URL, client_secret=CLIENT_SECRET,
                                  authorization_response=request.url)

    session['oauth_token'] = token

    return render_template('index.html')


def like_rankings_from_data(data, instagram_api_instance):
    all_post_likes = []

    for post_id in data_to_ids(data):
        response = instagram_api_instance.get(
            API_PATH + '/media/{}/likes'.format(post_id))
        post_likes = response.json()['data']
        all_post_likes += post_likes

    return jsonify(post_likes_to_like_rankings(all_post_likes))


def post_likes_to_like_rankings(post_likes):
    username_list = [l['username'] for l in post_likes]
    likes_per_user = Counter(username_list).items()
    rankings = [{'username': username, 'like_count': count}
                for username, count
                in likes_per_user]
    rankings_by_like_count = sorted(rankings, key=lambda r: r['like_count'],
                                    reverse=True)
    rankings_with_ranks = [
        {'rank': i + 1, **r} for i, r in
        enumerate(rankings_by_like_count)
    ]

    return rankings_with_ranks


@app.route("/like-rankings")
def like_rankings():
    oauth_token = session.get('oauth_token')
    oauth_state = session.get('oauth_state')

    if not (oauth_token and oauth_state):
        abort(401)

    instagram = instagram_api(token=session['oauth_token'])
    data = instagram.get(API_PATH + '/users/self/media/recent/').json()
    return like_rankings_from_data(data, instagram)


@app.route("/instagram-oauth-token")
def instagram_oauth_token():
    return jsonify(session.get('oauth_token'))


def data_to_ids(data):
    posts = data['data']
    return [p['id'] for p in posts if p['likes']['count'] > 0]
