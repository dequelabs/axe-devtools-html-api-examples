import shutil

import behave_webdriver
from webdriver_manager.chrome import ChromeDriverManager
import os

def before_all(context):
    context.behave_driver = behave_webdriver.Chrome(ChromeDriverManager().install())
    # context.behave_driver.quit()
    rootpath=os.getcwd()
    shutil.rmtree(rootpath+"/axe-reports/")


def after_all(context):
    # cleanup after tests run
    absolute_path_to_proj = os.getcwd()
    path = absolute_path_to_proj.split(" ")
    pathlist = path[0].split("/")
    rootpath = ""
    for string in pathlist:
        rootpath = rootpath+"/"+string
        if string == 'unittest':
            break
    reporter = (rootpath)+"/resources/reporter-cli-macos"
    resultspath = rootpath+"/a11y-results"
    jsonpath = rootpath + "/axe-reports"
    if not (os.path.isdir(jsonpath)):
        os.mkdir(jsonpath)
    command_html = str(reporter) +" "+jsonpath+" "+resultspath+" --format html"
    command_csv = str(reporter) +" "+jsonpath+" "+resultspath+" --format csv"
    command_xml = str(reporter) +" "+jsonpath+" "+resultspath+" --format xml"
    os.system(command_html)
    os.system(command_csv)
    os.system(command_xml)
    context.behave_driver.quit()




