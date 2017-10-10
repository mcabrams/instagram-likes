import os
import sys
import time

from flask_testing import LiveServerTestCase
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.remote import webdriver
from selenium.webdriver.support.ui import WebDriverWait

from app import app

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class FunctionalTestCase(LiveServerTestCase):
    host = 'web'

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.WebDriver(
            command_executor='http://selenium:4444/wd/hub',
            desired_capabilities=DesiredCapabilities.CHROME)
        cls.driver.implicitly_wait(0.3)
        cls.wait = WebDriverWait(cls.driver, 1)
        super().setUpClass()

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        super().tearDownClass()
        cls.driver.quit()

    @classmethod
    def addCleanup(cls):
        # Always quit the driver, even when an exception occurs.
        cls.driver.quit()

    def run(self, result):
        self.result = result.result if hasattr(result, 'result') else result
        self.result.stopTest = self.stopTest
        super().run(result)

    def stopTest(self, test):
        """Called when the given test has been run, if we have any errors
        let's take a screenshot"""
        if not self.passed:
            self.screen_shot()

    @property
    def passed(self):
        return not (self.errored or self.failed)

    @property
    def errored(self):
        return self.id() in [case.id() for case, _ in self.result.errors]

    @property
    def failed(self):
        return self.id() in [case.id() for case, _ in self.result.failures]

    def screen_shot(self):
        date_string = time.strftime("%m-%d-%H-%M")
        file_name = "/app/{}-{}.jpg".format(date_string,
                                            self._testMethodName)
        self.driver.save_screenshot(file_name)

    def get_real_server_url(self):
        return self.get_server_url().replace('localhost', self.host)

    def url(self, path):
        """Returns a fully qualified URL given a path component."""
        return self.get_real_server_url() + path

    def create_app(self):
        app.config['SERVER_NAME'] = 'web:8943'
        app.config['TESTING'] = True
        # Default port is 5000
        app.config['LIVESERVER_PORT'] = 8943
        # Default timeout is 5 seconds
        app.config['LIVESERVER_TIMEOUT'] = 10
        return app
