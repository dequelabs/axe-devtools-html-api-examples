/*
*  This example showcases a basic integration testing suite that tests multiple pages in different states for accessibility. 
*/
const { assert } = require('chai');
const selenium = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

// axe DevTools scanning tools and reporter
const AxeDevtoolsWebdriverJS = require('@axe-devtools/webdriverjs');
const AxeDevtoolsReporter = require('@axe-devtools/reporter').default;

describe('Accessibility site scan with axe DevTools WebDriverJS', () => {
  let axeDevTools, reporter, driver;
  
  before(async () => {

    driver = await new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();

    //Creation of axe DevTools driver object, taking browser and standards to use for testing
    axeDevTools = await new AxeDevtoolsWebdriverJS(driver);

    //Creation of axe DevTools reporter object with "suite name" and folder where reports go
    reporter = new AxeDevtoolsReporter('DevTools-reporter', './a11y-results/homepageFlows');
  });

  after(async () => {
    /**
     * Builds all the results objects into all available report formats
     * HTML, CSV, and XML
     */
    await reporter.buildHTML('./a11y-results/html/');
    await reporter.buildJUnitXML('./a11y-results/xml/');
    await reporter.buildCSV('./a11y-results/csv/');
    
    await driver.quit();
  });

  describe('Laptop Flow', () => {
    /** 
    * Example test case that showcases a standard integration of axe DevTools
    * Accesses page, scans and logs results
    * reporter processes these results in "after" and names them 'homepage-laptop-flow'
    */
    it('Laptop page is accessible', async () => {
      await driver.get('http://abcdcomputech.dequecloud.com/laptopsandnotebooks.php');
      const results = await axeDevTools.analyze();
      reporter.logTestResult('homepage-laptop-flow', results);
      assert.lengthOf(results.violations, 0, 'More than zero a11y violations');
    });
  });

  describe('Homepage Flow', () => {
    /** 
    * Example test case that showcases a standard integration of axe DevTools
    * Works through flow, scans and logs results
    * reporter processes these results in "after" and names them 'homepage-no-flow'
    * for the first scan, and 'homepage-search-flow' for the second
    */
    it('Homepage is accessible, no modifications', async () => {
      await driver.get('http://abcdcomputech.dequecloud.com/');
      const results = await axeDevTools.analyze();
      reporter.logTestResult('homepage-no-flow', results);
      assert.lengthOf(results.violations, 0, 'More than zero a11y violations');
    });

    it('Homepage is accessible, search entry', async () => {
      await driver.get('http://abcdcomputech.dequecloud.com/');
      const username = await driver.findElement(By.name("q"));
      await username.sendKeys('csun 2019 accepting new papers for presentations');
      const goButton = await driver.findElement(By.id("go"));
      goButton.click();
      const results = await axeDevTools.analyze();
      reporter.logTestResult('homepage-search-flow', results);
      assert.lengthOf(results.violations, 0, 'More than zero a11y violations');
    });
  });
});