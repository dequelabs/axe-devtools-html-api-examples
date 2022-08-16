const playwright = require ('Playwright');
const AxeDevtoolsPlaywright = require("@axe-devtools/playwright").default;
const AxeDevtoolsBuilder = require('@axe-devtools/playwright').default;
Feature('Checking for a11y issues');

Scenario('Checking homepage for a11y issues', ({ I }) => {
    // I.amOnPage("https://broken-workshop.dequelabs.com/")
    I.checkForA11yissues("https://broken-workshop.dequelabs.com/")
});
