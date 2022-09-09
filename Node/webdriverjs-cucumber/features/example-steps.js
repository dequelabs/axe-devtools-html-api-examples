const { Given, When, Then, AfterAll } = require('cucumber')
const AxeDevToolsWebdriverJS = require('@axe-devtools/webdriverjs')
const WebDriver = require('selenium-webdriver')
const { By } = require('selenium-webdriver')
const Reporter = require('@axe-devtools/reporter').default

driver = new WebDriver.Builder().forBrowser('chrome').build()

//Creation of axe DevTools driver object, taking browser and standards to use for testing
axeDevTools = new AxeDevToolsWebdriverJS(driver)
let reporter = new Reporter('DevTools-reporter', './a11y-results/homepageFlows')
let count = 1

Then('the page should be audited for accessibility', async function () {
  const results = await axeDevTools.analyze()
  temp = count += 1
  reporter.logTestResult('Scan' + temp, results)
})

Given('I visit a11y test website homepage', async function () {
  await driver.get('https://broken-workshop.dequelabs.com/')
})

When('I click on the cook chocolate cake button', async function () {
  await driver
    .findElement(
      By.css(
        '#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button'
      )
    )
    .click()
})

AfterAll('end', async function () {
  await reporter.buildHTML('./a11y-results/html/')
  await reporter.buildJUnitXML('./a11y-results/xml/')
  await reporter.buildCSV('./a11y-results/csv/')
  await driver.quit()
})
