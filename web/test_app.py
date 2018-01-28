from unittest.mock import patch
import unittest

from app import app, data_to_ids, post_likes_to_like_rankings
from flask import Response


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


class LikeRankingsTestCase(FlaskTestCase):
    url = '/like-rankings'

    def setUp(self):
        super().setUp()
        patcher = patch('app.instagram_api')
        self.instagram_api = patcher.start()
        self.addCleanup(patcher.stop)

    def update_session(self, update):
        with self.app as client:
            with client.session_transaction() as session:
                session.update(update)

    def test_returns_unauthorized_if_oauth_token_not_on_session(self):
        response = self.app.get(self.url)
        self.assertEqual(response.status_code, 401)

    def test_returns_401_if_oauth_token_but_not_oauth_state_on_session(self):
        self.update_session({'oauth_token': 'foobar'})
        response = self.app.get(self.url)
        self.assertEqual(response.status_code, 401)

    def test_returns_401_if_oauth_state_but_not_oauth_token_on_session(self):
        self.update_session({'oauth_state': 'foobar'})
        response = self.app.get(self.url)
        self.assertEqual(response.status_code, 401)

    def test_returns_200_if_oauth_state_and_token_on_session(self):
        self.update_session({'oauth_state': 'foobar'})
        self.update_session({'oauth_token': 'foobar'})

        response = self.app.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_gets_at_expected_instagram_uri(self):
        self.update_session({'oauth_state': 'foobar'})
        self.update_session({'oauth_token': 'foobar'})

        self.app.get(self.url)
        self.instagram_api().get.assert_called_once_with(
            'https://api.instagram.com/v1/users/self/media/recent/')

    @patch('app.like_rankings_from_data')
    def test_calls_like_rankings_from_data_on_returned_json(self, rankings):
        rankings.return_value = Response()
        self.update_session({'oauth_state': 'foobar'})
        self.update_session({'oauth_token': 'foobar'})

        returned_json = self.instagram_api().get().json.return_value

        self.app.get(self.url)

        rankings.assert_called_once_with(returned_json, self.instagram_api())


class PostLikesToLikeRankingsTestCase(unittest.TestCase):
    def test_returns_list_of_like_rankings(self):
        post_likes = [
            {'username': 'barry'},
            {'username': 'barry'},
            {'username': 'todd'},
        ]

        actual = post_likes_to_like_rankings(post_likes)
        self.assertEqual(actual, [
            {'username': 'barry', 'like_count': 2, 'rank': 1},
            {'username': 'todd', 'like_count': 1, 'rank': 2},
        ])


if __name__ == '__main__':
    unittest.main()
