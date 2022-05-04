const { test, expect } = require('@playwright/test');
const AxeDevtoolsBuilder = require('@axe-devtools/playwright').default;
const AxeDevtoolsReporter = require("@axe-devtools/reporter").default;
const reporter = new AxeDevtoolsReporter('playwright', './a11y-results/homepageFlows');



test.afterAll(async ({ context }) => {
    await reporter.buildHTML("./a11y-results/html/");
    await reporter.buildJUnitXML("./a11y-results/xml/");
    await reporter.buildCSV("./a11y-results/csv/");
    await browser.close();
});


test.describe('two tests', () => {
    test('basic test_1', async ({ page, browserName }) => {
        await page.goto("https://broken-workshop.dequelabs.com/");
        const results = await new AxeDevtoolsBuilder({ page }).analyze();
        reporter.logTestResult('homepage-no-flow_' + browserName, results);
        expect(results.violations).toHaveLength(0)
    });

    test('basic test_2', async ({ page, browserName }) => {
        await page.goto("https://broken-workshop.dequelabs.com/");
        await page.locator('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click();
        const results2 = await new AxeDevtoolsBuilder({ page }).analyze();
        reporter.logTestResult("homepage-altered-state_" + browserName, results2);
        expect(results2.violations).toHaveLength(0)
    });
});