import os
import unittest
from axe_devtools_api import Axe, ReportConfiguration
from axe_devtools_selenium import AxeDriver
from axe_devtools_unittest import AxeAssertions
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


class TestAxe(unittest.TestCase, AxeAssertions):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(ChromeDriverManager().install())
        cls.axe = Axe(AxeDriver(cls.driver))
        cls.root_path = cls.get_relative_path()
        cls.jsonpath = (cls.root_path)+"/axe-json-reports"
        cls.reporter = (cls.root_path)+"/resources/reporter-cli-macos"
        cls.resultspath = cls.root_path+"/a11y-results"
        if not (os.path.isdir(cls.jsonpath)):
            os.mkdir(cls.jsonpath)

    @classmethod
    def get_relative_path(cls):
        absolute_path_to_proj = os.getcwd()
        path = absolute_path_to_proj.split(" ")
        pathlist = path[0].split("/")
        requiredpath = ""
        for string in pathlist:
            requiredpath = requiredpath+"/"+string
            if string == 'unittest':
                break
        return requiredpath

    def test_homepage_flow(self):
        self.driver.get("https://broken-workshop.dequelabs.com/")
        report_config = ReportConfiguration().test_suite_name("homepage-no-flow").ui_state("Pre click")
        axe = Axe(AxeDriver(self.driver), report_configuration=report_config)
        # Scanning the page and storing in a results folder
        result1 = axe.analyze()
        with open(self.jsonpath+"/a11y_result1.json", "w") as f:
            f.write(result1.to_json())

    def test_recipe_card_on_homepage(self):
        self.driver.find_element_by_css_selector('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click()
        report_config1 = ReportConfiguration().test_suite_name("homepage-altered-state").ui_state("Post click")
        axe2 = Axe(AxeDriver(self.driver), report_configuration=report_config1)
        result2 = axe2.analyze()
        with open(self.jsonpath+"/a11y_result2.json", "w") as f:
            f.write(result2.to_json())

    @classmethod
    def tearDownClass(self) :
        self.driver.quit()
        command_html = str(self.reporter) +" "+self.jsonpath+" "+self.resultspath+" --format html"
        command_csv = str(self.reporter) +" "+self.jsonpath+" "+self.resultspath+" --format csv"
        command_xml = str(self.reporter) +" "+self.jsonpath+" "+self.resultspath+" --format xml"
        os.system(command_html)
        os.system(command_csv)
        os.system(command_xml)




