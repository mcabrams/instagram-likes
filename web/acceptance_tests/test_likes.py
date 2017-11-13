import unittest

from base import FunctionalTestCase


class MyTest(FunctionalTestCase):
    def test_shows_login_to_instagram(self):
        self.driver.get('nginx:8001')
        self.driver.find_element_by_link_text('Login to Instagram')


if __name__ == '__main__':
    unittest.main()
