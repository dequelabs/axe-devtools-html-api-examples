// in this file you can append custom step methods to 'I' object
const AxeDevtoolsBuilder = require("@axe-devtools/playwright").default;
const AxeDevtoolsReporter = require("@axe-devtools/reporter").default;
const playwright = require('playwright');
const reporter = new AxeDevtoolsReporter(
  "DevTools-Reporter",
  "./a11y-results/homepageFlows"
);

module.exports = function() {
  return actor({
    checkHomepageForA11yissues: async function(url) {
      browser = await playwright.chromium.launch({ headless: false });
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto(url)
      const results = await new AxeDevtoolsBuilder({ page }).analyze()
      reporter.logTestResult("homepage-no-flow", results);
      await browser.close();
      }
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    ,
    checkRecipecardForA11yissues: async function(url) {
      browser = await playwright.chromium.launch({ headless: false });
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto(url)
      await page.locator('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click();
      const results = await new AxeDevtoolsBuilder({ page }).analyze()
      reporter.logTestResult("homepage-altered-state", results);
      await browser.close();
    }
      ,
      createReports: async function() {
      await reporter.buildHTML("./a11y-results/html/");
      await reporter.buildJUnitXML("./a11y-results/xml/");
      await reporter.buildCSV("./a11y-results/csv/");
    }
  });
}
