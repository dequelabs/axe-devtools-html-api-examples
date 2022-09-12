const AxeDevtoolsBuilder = require("@axe-devtools/playwright").default;
const AxeDevtoolsReporter = require("@axe-devtools/reporter").default;
Feature('Checking for a11y issues');

Scenario('Checking homepage for a11y issues',async ({ I })  => {
    await I.checkHomepageForA11yissues("https://broken-workshop.dequelabs.com/")
    await I.checkRecipecardForA11yissues("https://broken-workshop.dequelabs.com/")
    await I.createReports()
});
