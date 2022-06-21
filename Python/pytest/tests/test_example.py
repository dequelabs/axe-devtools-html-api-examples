import os
from selenium import webdriver
from axe_devtools_selenium import AxeDriver
from webdriver_manager.chrome import ChromeDriverManager
from axe_devtools_api import Axe, ReportConfiguration
from sys import platform
import pytest


@pytest.fixture()
def get_relative_path(request):
    absolute_path_to_proj = os.getcwd()
    path = absolute_path_to_proj.split(" ")
    pathlist = path[0].split("/")
    _requiredpath = ""
    for string in pathlist:
        _requiredpath = _requiredpath+"/"+string
        if string == 'pytest':
            break
    return (_requiredpath)

@pytest.fixture()
def init_driver(request, get_relative_path):
    #setting up the webdriver and the reporting paths
    driver = webdriver.Chrome(ChromeDriverManager().install())
    request.cls.driver = driver
    root_path = get_relative_path
    jsonpath = (root_path)+"/axe-json-reports"
    request.cls.jsonpath=jsonpath
    if platform == "linux" or platform == "linux2":
        reporter = root_path+"/resources/reporter-cli-linux"
    elif platform == "darwin":
        reporter = root_path+"/resources/reporter-cli-macos"
    elif platform == "win32":
        reporter = root_path+"/resources/reporter-cli-win.exe"
    resultspath = root_path+"/a11y-results"
    if not (os.path.isdir(jsonpath)):
        os.mkdir(jsonpath)
    yield
    # Setting up the reports and ending the webdriver session
    command_html = str(reporter) +" "+jsonpath+" "+resultspath+" --format html"
    command_csv = str(reporter) +" "+jsonpath+" "+resultspath+" --format csv"
    command_xml = str(reporter) +" "+jsonpath+" "+resultspath+" --format xml"
    os.system(command_html)
    os.system(command_csv)
    os.system(command_xml)
    driver.quit()

class Test_axe():

    def test_homepage_flow(self, init_driver):
        self.driver.get("https://broken-workshop.dequelabs.com/")
        report_config = ReportConfiguration().test_suite_name("homepage-no-flow").ui_state("Pre click")
        axe = Axe(AxeDriver(self.driver), report_configuration=report_config)
        # Scanning the page and storing in a results folder
        result1 = axe.analyze()
        with open(self.jsonpath+"/a11y_result1.json", "w") as f:
            f.write(result1.to_json())

    def test_recipe_card_on_homepage(self,init_driver):
        self.driver.get("https://broken-workshop.dequelabs.com/")
        self.driver.find_element_by_css_selector('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click()
        report_config1 = ReportConfiguration().test_suite_name("homepage-altered-state").ui_state("Post click")
        axe2 = Axe(AxeDriver(self.driver), report_configuration=report_config1)
        # Scanning the page and storing in a results folder
        result2 = axe2.analyze()
        with open(self.jsonpath+"/a11y_result2.json", "w") as f:
            f.write(result2.to_json())





