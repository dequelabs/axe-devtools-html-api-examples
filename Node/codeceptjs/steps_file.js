// in this file you can append custom step methods to 'I' object
const AxeDevtoolsBuilder = require("@axe-devtools/playwright").default;
const AxeDevtoolsReporter = require("@axe-devtools/reporter").default;
const playwright = require('playwright');

module.exports = function() {
  return actor({
    checkForA11yissues: async function(url) {
      browser = await playwright.chromium.launch({ headless: false });
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto(url)
      const results = await new AxeDevtoolsBuilder({ page }).analyze()
      console.log(results);

    }
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

  });
}
