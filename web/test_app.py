import unittest

from app import data_to_ids


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


if __name__ == '__main__':
    unittest.main()
