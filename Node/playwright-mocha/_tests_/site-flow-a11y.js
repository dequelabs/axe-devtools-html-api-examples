/*
 *  This example showcases a basic integration testing suite that tests multiple pages in different states for accessibility.
 */
const { assert } = require("chai");
const playwright = require("playwright");

// axe DevTools scanning tools and reporter
const AxeDevtoolsPlaywright = require("@axe-devtools/playwright").default;
const AxeDevtoolsReporter = require("@axe-devtools/reporter").default;

describe("Accessibility site scan with axe DevTools Playwright", async () => {
  let reporter, page, axeDevTools, browser;
  //Creation of axe DevTools reporter object with "suite name" and folder where reports go
  reporter = new AxeDevtoolsReporter(
    "DevTools-Reporter",
    "./a11y-results/homepageFlows"
  );

  before(async () => {
    browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();

    //Create axe DevTools scanning object
    axeDevTools = new AxeDevtoolsPlaywright({ page });
  });

  after(async () => {
    /**
     * Builds all the results objects into all available report formats
     * HTML, CSV, and XML
     */
    await reporter.buildHTML("./a11y-results/html/");
    await reporter.buildJUnitXML("./a11y-results/xml/");
    await reporter.buildCSV("./a11y-results/csv/");
    await browser.close();
  });

  describe("Homepage Flow", () => {
    /**
     * Example test case that showcases a standard integration of axe DevTools
     * Works through flow, scans and logs results
     * reporter processes these results in "after" and names them 'homepage-no-flow'
     * for the first scan, and 'homepage-search-flow' for the second
     */
    it("Homepage is accessible, no modifications", async () => {
      await page.goto("https://broken-workshop.dequelabs.com/");
      const results = await axeDevTools.analyze();
      reporter.logTestResult("homepage-no-flow", results);
      assert.lengthOf(results.violations, 0, "More than zero a11y violations");
    });

    it("Homepage is accessible, recipe card", async () => {
      await page.goto("https://broken-workshop.dequelabs.com/");
      await page.locator('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click();
      const results = await axeDevTools.analyze();
      reporter.logTestResult("homepage-altered-state", results);
      assert.lengthOf(results.violations, 0, "More than zero a11y violations");
    });
  });
});
