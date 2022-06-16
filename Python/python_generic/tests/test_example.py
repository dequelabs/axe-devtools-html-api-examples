import os
from selenium import webdriver
from axe_devtools_selenium import AxeDriver
from selenium.webdriver.chrome.webdriver import WebDriver
from webdriver_manager.chrome import ChromeDriverManager
from axe_devtools_api import Axe, ReportConfiguration


class axe_analyze():
    def __init__(self):
        self.axe_analyze_test()

    # This method opens a url and then scans the page for a11y vioaltions
    def axe_analyze_test(self):
        # Initializing chrome and opening the url to be scanned
        driver = webdriver.Chrome(ChromeDriverManager().install())
        driver.get("https://broken-workshop.dequelabs.com/")

        # Setting the a11y report config
        report_config = ReportConfiguration().test_suite_name("homepage-no-flow").ui_state("Pre click")
        # Initializing the axedriver
        axe = Axe(AxeDriver(driver), report_configuration=report_config)
        # Scanning the page and storing in a results folder
        results = axe.analyze()

        # Clicking on an element and then setting the new report config and scanning the popup page for a11y violations.
        driver.find_element_by_css_selector('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click()
        report_config1 = ReportConfiguration().test_suite_name("homepage-altered-state").ui_state("Post click")
        axe2 = Axe(AxeDriver(driver), report_configuration=report_config1)
        results2 = axe2.analyze()

        # Getting the root path and accordingly setting the path to the reporter binary file, logger and the destination
        root_path = self.get_relative_path()
        reporter = root_path+"/resources/reporter-cli-macos"
        jsonpath = root_path+"/axe-json-reports"
        resultspath=root_path+"/a11y-results"

        if not (os.path.isdir(jsonpath)):
            os.mkdir(jsonpath)


        # Writing the results to a json file.
        with open(jsonpath+"/a11y_result1.json", "w") as f:
            f.write(results.to_json())
        with open(jsonpath+"/a11y_result2.json", "w") as f:
            f.write(results2.to_json())
        driver.quit()

        # Utilizing the reporter to create html,csv and xml reports using json report
        command_html = str(reporter) +" "+jsonpath+" "+resultspath+" --format html"
        command_csv = str(reporter) +" "+jsonpath+" "+resultspath+" --format csv"
        command_xml = str(reporter) +" "+jsonpath+" "+resultspath+" --format xml"
        os.system(command_html)
        os.system(command_csv)
        os.system(command_xml)

    def get_relative_path(self):
        absolute_path_to_proj=os.getcwd()
        path=absolute_path_to_proj.split(" ")
        pathlist=path[0].split("/")
        requiredlen=len(pathlist)-1
        requiredpath=""
        for string in pathlist:
            requiredpath=requiredpath+"/"+string
            if string=='python_generic':
                break
        print(requiredpath)
        return requiredpath


if __name__ == "__main__":
    axe_analyze()
