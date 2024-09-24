import os
import shutil
from sys import platform


class reporting:

    def __init__(self):
        # Does not require any initialization
        pass

    def get_relative_path(self):
        absolute_path_to_proj = os.getcwd()
        path = absolute_path_to_proj.split(" ")
        path_list = path[0].split("/")
        required_path = ""
        for string in path_list:
            required_path = required_path + "/" + string
            if string == 'robot':
                break
        return required_path

    def create_reports(self):
        root_path = self.get_relative_path()
        if platform == "linux" or platform == "linux2":
            reporter = root_path+"/resources/reporter-cli-linux"
        elif platform == "darwin":
            reporter = root_path + "/resources/reporter-cli-macos"
        elif platform == "win32":
            reporter = root_path + "/resources/reporter-cli-win.exe"
        results_path = root_path + "/a11y-results"
        json_path = root_path + "/axe-reports"
        if not (os.path.isdir(json_path)):
            os.mkdir(json_path)
        command_html = str(reporter) + " " + json_path + " " + \
            results_path+" --format html"
        command_csv = str(reporter) + " " + json_path + \
            " " + results_path + " --format csv"
        command_xml = str(reporter) + " " + json_path + \
            " " + results_path + " --format xml"
        try:
            os.system(command_html)
            os.system(command_csv)
            os.system(command_xml)
        except:
            return ("reporter binary is not present")

    def clear_reports(self):
        root_path = self.get_relative_path()
        if not (os.path.isdir(root_path + "/axe-reports/")):
            os.mkdir(root_path + "/axe-reports/")
        shutil.rmtree(root_path + "/axe-reports/")
