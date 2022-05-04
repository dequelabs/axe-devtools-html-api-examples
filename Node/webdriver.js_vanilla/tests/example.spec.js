const AxeDevToolsWebdriverJS = require('@axe-devtools/webdriverjs');
const WebDriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const Reporter = require('@axe-devtools/reporter').default;
const async_hooks = require('async_hooks');
// var driver = new WebDriver.Builder().forBrowser('chrome').build();




async function exampleTest() {
    driver = await new WebDriver.Builder().forBrowser('chrome').build();

    //Creation of axe DevTools driver object, taking browser and standards to use for testing
    axeDevTools = await new AxeDevToolsWebdriverJS(driver);

    //Creation of axe DevTools reporter object with "suite name" and folder where reports go
    reporter = new Reporter('DevTools-reporter', './a11y-results/homepageFlows');
    // Navigating to the url
    await driver.get('https://broken-workshop.dequelabs.com/');
    // Analyzing foe a11y issues
    const results = await axeDevTools.analyze();
    // Logging the result using the reporter
    reporter.logTestResult('homepage-laptop-flow', results);

    await driver.findElement(By.css('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button')).click();
    const results2 = await axeDevTools.analyze();
    reporter.logTestResult("homepage-altered-state", results2);

    // Building the report in different formats
    await reporter.buildHTML('./a11y-results/html/');
    await reporter.buildJUnitXML('./a11y-results/xml/');
    await reporter.buildCSV('./a11y-results/csv/');

    await driver.quit();
}

exampleTest()