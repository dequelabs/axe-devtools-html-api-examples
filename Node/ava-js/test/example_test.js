const test =require ('ava');
const AxeDevToolsWebdriverJS = require('@axe-devtools/webdriverjs');
const  WebDriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
// import Reporter from '@axe-devtools/reporter';
const Reporter = require('@axe-devtools/reporter').default;
let reporter = new Reporter('DevTools-reporter', './a11y-results/homepageFlows');



test.beforeEach(async t => {
	// t.context.driver = new Builder().forBrowser('chrome').build();
    t.context.driver = new WebDriver.Builder().forBrowser('chrome').build();
	await t.context.driver.get('https://broken-workshop.dequelabs.com/');
});


test('homepage', async homepage => {
    //  let reporter = new Reporter('DevTools-reporter', './a11y-results/homepageFlows');
    // Navigating to the url
    // let driver = new WebDriver.Builder().forBrowser('chrome').build();
    const {driver} = homepage.context;
    let axeDevTools =  new AxeDevToolsWebdriverJS(driver);
    // Analyzing foe a11y issues
    const results = await axeDevTools.analyze();
    // Logging the result using the reporter
    reporter.logTestResult('homepage-laptop-flow', results);
    homepage.pass();
}) 

test('recipeCard', async recipeCard => {
    // let reporter = new Reporter('DevTools-reporter', './a11y-results/homepageFlows');
   // Navigating to the url
//    let driver = new WebDriver.Builder().forBrowser('chrome').build();
    const {driver} = recipeCard.context;
//    await driver.get('https://broken-workshop.dequelabs.com/');
   await driver.findElement(By.css('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button')).click();
   let axeDevTools =  new AxeDevToolsWebdriverJS(driver);
   // Analyzing foe a11y issues
   const results2 = await axeDevTools.analyze();
   // Logging the result using the reporter
   reporter.logTestResult('homepage-altered-state', results2);
   recipeCard.pass();
}) 


test.afterEach('cleanup', async t => {
	await t.context.driver.close();
});


test.after('reporting', async t => {
    await reporter.buildHTML('./a11y-results/html/');
    await reporter.buildJUnitXML('./a11y-results/xml/');
    await reporter.buildCSV('./a11y-results/csv/');
}); 