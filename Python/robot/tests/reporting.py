import os
import shutil
from sys import platform

class reporting:

    def __init__(self):
        self.create_reports()


    def get_relative_path(self):
        absolute_path_to_proj = os.getcwd()
        path = absolute_path_to_proj.split(" ")
        pathlist = path[0].split("/")
        requiredpath = ""
        for string in pathlist:
            requiredpath = requiredpath+"/"+string
            if string == 'robot':
                break
        return requiredpath

    def create_reports(self):
        rootpath=self.get_relative_path()
        if platform == "linux" or platform == "linux2":
            reporter = rootpath+"/resources/reporter-cli-linux"
        elif platform == "darwin":
            reporter = rootpath+"/resources/reporter-cli-macos"
        elif platform == "win32":
            reporter = rootpath+"/resources/reporter-cli-win.exe"
        resultspath = rootpath+"/a11y-results"
        jsonpath = rootpath + "/axe-reports"
        if not (os.path.isdir(jsonpath)):
            os.mkdir(jsonpath)
        command_html = str(reporter) +" "+jsonpath+" "+resultspath+" --format html"
        command_csv = str(reporter) +" "+jsonpath+" "+resultspath+" --format csv"
        command_xml = str(reporter) +" "+jsonpath+" "+resultspath+" --format xml"
        try:
            os.system(command_html)
            os.system(command_csv)
            os.system(command_xml)
        except:
            return ("reporter binary is not present")

    def clear_reports(self):
        rootpath=self.get_relative_path()
        if not (os.path.isdir(rootpath+"/axe-reports/")):
            os.mkdir(rootpath+"/axe-reports/")
        shutil.rmtree(rootpath+"/axe-reports/")

if __name__ == "__main__":
    reporting()