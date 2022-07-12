from axe_devtools_behave import *

@when('I visit a11y test website homepage')
def step(context):
    context.behave_driver.get("https://broken-workshop.dequelabs.com/")

@when('click on the Cook chocolate cake button')
def step(context):
    context.behave_driver.click_element('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button')


