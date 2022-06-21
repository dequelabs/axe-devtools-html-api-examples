import shutil
from sys import platform
import behave_webdriver
from webdriver_manager.chrome import ChromeDriverManager
import os

def before_all(context):
    context.behave_driver = behave_webdriver.Chrome(ChromeDriverManager().install())
    rootpath=os.getcwd()
    if not (os.path.isdir(rootpath+"/axe-reports/")):
        os.mkdir(rootpath+"/axe-reports/")
    shutil.rmtree(rootpath+"/axe-reports/")


def after_all(context):
    # cleanup after tests run
    absolute_path_to_proj = os.getcwd()
    path = absolute_path_to_proj.split(" ")
    pathlist = path[0].split("/")
    rootpath = ""
    for string in pathlist:
        rootpath = rootpath+"/"+string
        if string == 'behave':
            break
    try:
        if platform == "linux" or platform == "linux2":
            reporter = rootpath+"/resources/reporter-cli-linux"
        elif platform == "darwin":
            reporter = rootpath+"/resources/reporter-cli-macos"
        elif platform == "win32":
            reporter = rootpath+"/resources/reporter-cli-win.exe"
    except:
        return ("The reporter binary is not present")
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




