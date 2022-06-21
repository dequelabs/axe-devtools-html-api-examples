*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Axe Analyze
    Open Homepage and analyze for a11y issues
    Open the recipe card on the homepage and check for a11y issues
    [Teardown]    Close Browser

