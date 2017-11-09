import unittest

from base import FunctionalTestCase


class MyTest(FunctionalTestCase):
    def test_server_is_up_and_running(self):
        self.driver.get('nginx:8001')
        self.assertIn('Instagram',
                      self.driver.find_element_by_tag_name('body').text)


if __name__ == '__main__':
    unittest.main()
