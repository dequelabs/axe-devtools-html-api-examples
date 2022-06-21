*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
#Library           SeleniumLibrary
Library           axe_devtools_robot.AxeRobot
Library           reporting.py


*** Variables ***
${SERVER}         localhost:7272
${BROWSER}        Chrome
${DELAY}          3
${VALID USER}     demo
${VALID PASSWORD}    mode
${LOGIN URL}      https://broken-workshop.dequelabs.com/
${WELCOME URL}    https://broken-workshop.dequelabs.com/
${ERROR URL}      https://broken-workshop.dequelabs.com/

*** Keywords ***
Open Homepage and analyze for a11y issues
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    audit_for_accessibility

Open the recipe card on the homepage and check for a11y issues
    Click element    css:#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button
    audit_for_accessibility
    create reports



