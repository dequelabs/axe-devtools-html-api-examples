const { test, expect } = require('@playwright/test');
const AxeDevtoolsBuilder = require('@axe-devtools/playwright').default;
const AxeDevtoolsReporter = require("@axe-devtools/reporter").default;
const { v4: uuidv4 } = require('uuid');
const reporter = new AxeDevtoolsReporter('playwright', './a11y_reports/a11y_results/json/' + uuidv4());


test.afterAll(async ({ context }) => {
    await reporter.buildHTML("./a11y_reports/a11y_results/html/results_" + uuidv4());
    await reporter.buildJUnitXML("./a11y_reports/a11y_results/xml/results_" + uuidv4());
    await reporter.buildCSV("./a11y_reports/a11y_results/csv/results_" + uuidv4());
    await page.close();
});

test('basic test_1', async ({ page }) => {
    await page.goto("https://broken-workshop.dequelabs.com/");
    const results = await new AxeDevtoolsBuilder({ page }).analyze();
    reporter.logTestResult('homepage-no-flow', results);
    expect(results.violations).toHaveLength(0)
});

test('basic test_2', async ({ page }) => {
    await page.goto("https://broken-workshop.dequelabs.com/");
    await page.locator('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click();
    const results = await new AxeDevtoolsBuilder({ page }).analyze();
    reporter.logTestResult("homepage-altered-state", results);
    expect(results.violations).toHaveLength(0)
});
