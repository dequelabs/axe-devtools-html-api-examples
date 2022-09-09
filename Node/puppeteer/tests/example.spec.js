const puppeteer = require('puppeteer')
const { AxeDevToolsPuppeteer } = require('@axe-devtools/puppeteer')
const Reporter = require('@axe-devtools/reporter').default
const reporter = new Reporter('Basic Test Suite', './a11y-results/json')
const assert = require('assert')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://broken-workshop.dequelabs.com/')
  const results = await new AxeDevToolsPuppeteer(page).analyze()
  reporter.logTestResult('homepage-no-flow', results)

  // Navigating to a new page by clicking on a button and then analysing the new page.
  await page.click(
    '#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button'
  )
  const results2 = await new AxeDevToolsPuppeteer(page).analyze()
  reporter.logTestResult('homepage-altered-state', results2)

  // Building the report based on the logged results and then asserting for the a11y errors to be 0.
  await reporter.buildHTML('./a11y-results/html/')
  await reporter.buildJUnitXML('./a11y-results/xml/')
  await reporter.buildCSV('./a11y-results/csv/')
  assert.deepEqual(results.violations, 0, 'More than zero a11y violations')
  await browser.close()
})()
