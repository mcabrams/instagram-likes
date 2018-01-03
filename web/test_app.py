from unittest.mock import patch
import unittest

from app import app, data_to_ids


class DataToIdsTestCase(unittest.TestCase):
    def setUp(self):
        self.data = {
            "data": [
                {
                    "id": "1",
                    "likes": {
                        "count": 18
                    },
                },
                {
                    "id": "2",
                    "likes": {
                        "count": 18
                    },
                },
            ],
            "meta": {
                "code": 200
            },
            "pagination": {}
        }

    def test_converts_to_ids(self):
        self.assertEqual(data_to_ids(self.data), ['1', '2'])

    def test_excludes_posts_with_zero_likes(self):
        self.data['data'][0]['likes']['count'] = 0

        self.assertEqual(data_to_ids(self.data), ['2'])


class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        app.testing = True
        self.app = app.test_client()


class LikeCountsTestCase(FlaskTestCase):
    def setUp(self):
        super().setUp()
        patcher = patch('app.instagram_api')
        self.instagram_api = patcher.start()
        self.addCleanup(patcher.stop)

    def test_returns_unauthorized_if_oauth_token_not_on_session(self):
        response = self.app.get('/like-counts')
        self.assertEqual(response.status_code, 401)

    def test_returns_401_if_oauth_token_but_not_oauth_state_on_session(self):
        with self.app as client:
            with client.session_transaction() as session:
                session['oauth_token'] = 'foobar'

        response = self.app.get('/like-counts')
        self.assertEqual(response.status_code, 401)

    def test_returns_401_if_oauth_state_but_not_oauth_token_on_session(self):
        with self.app as client:
            with client.session_transaction() as session:
                session['oauth_state'] = 'foobar'

        response = self.app.get('/like-counts')
        self.assertEqual(response.status_code, 401)

    def test_returns_200_if_oauth_state_and_token_on_session(self):
        with self.app as client:
            with client.session_transaction() as session:
                session['oauth_state'] = 'foobar'
                session['oauth_token'] = 'foobar'

        response = self.app.get('/like-counts')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
