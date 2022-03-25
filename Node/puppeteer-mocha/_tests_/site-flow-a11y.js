/*
 *  This example showcases a basic integration testing suite that tests multiple pages in different states for accessibility.
 */
const { assert } = require('chai')
const puppeteer = require('puppeteer')

// axe DevTools scanning tools and reporter
const { AxeDevToolsPuppeteer } = require('@axe-devtools/puppeteer')
const AxeDevToolsReporter = require('@axe-devtools/reporter').default

describe('Accessibility Site Scan with axe DevTools Puppeteer', () => {
  let reporter, driver, page

  before(async () => {
    driver = await puppeteer.launch({ headless: false })
    page = await driver.newPage()
    await page.setBypassCSP(true)

    //Creation of axe DevTools reporter object with "suite name" and folder where reports go
    reporter = new AxeDevToolsReporter(
      'DevTools-Reporter',
      './a11y-results/homepageFlows'
    )
  })

  after(async () => {
    /**
     * Builds all the results objects into all available report formats
     * HTML, CSV, and XML
     */
    await reporter.buildHTML('./a11y-results/html/')
    await reporter.buildJUnitXML('./a11y-results/xml/')
    await reporter.buildCSV('./a11y-results/csv/')

    await driver.close()
  })

  describe('Homepage Flow', () => {
    /**
     * Example test case that showcases a standard integration of axe DevTools
     * Works through flow, scans and logs results
     * reporter processes these results in "after" and names them 'homepage-no-flow'
     * for the first scan, and 'homepage-search-flow' for the second
     */
    it('Homepage is accessible, no modifications', async () => {
      await page.goto('https://dequeuniversity.com/demo/mars/')
      const results = await new AxeDevToolsPuppeteer(page).analyze()
      reporter.logTestResult('homepage-standard', results)
      assert.lengthOf(results.violations, 0, 'More than zero a11y violations')
    })

    it('Homepage is accessible, modified menu', async () => {
      await page.goto('https://dequeuniversity.com/demo/mars/')
      await page.click('#widget-controls-passes')
      const results = await new AxeDevToolsPuppeteer(page).analyze()
      reporter.logTestResult('homepage-modified', results)
      assert.lengthOf(results.violations, 0, 'More than zero a11y violations')
    })
  })
})
