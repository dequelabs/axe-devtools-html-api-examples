const webdriverio = require("webdriverio");

// axe DevTools & its reporter is imported and instance created
const { AxeDevToolsWebdriverIO } = require("@axe-devtools/webdriverio");
const AxeDevToolsReporter = require("@axe-devtools/reporter").default;

let client;

/**
 * Setting up reporter to create reports
 * Creates the object of the report where
 * File name will start with `google`
 * and in folder `./a11y-results`
 */
const reportDir = "./a11y-results";
const axeReporter = new AxeDevToolsReporter("google", reportDir);

describe("axeDT simple google page", () => {
  beforeEach(async () => {
    client = await webdriverio.remote({
      port: 4444,
      path: "/wd/hub",
      services: ["chromedriver"],
      capabilities: {
        browserName: "chrome"
      },
      logLevel: "error"
    });
    await client.url("https://www.google.com");
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  after(async () => {
    /**
     * Builds all the results objects that `axeReporter` 
     * is holding in HTML, CSV, and XML
     */
    await axeReporter.buildHTML("./a11y-results/html");
    await axeReporter.buildCSV('./a11y-results/csv');
    await axeReporter.buildJUnitXML('./a11y-results/xml');
 });


  it("should have the right title", async () => {
    const title = await client.getTitle();
    expect(title).to.equal("Google");
  });

  /**
   * NOTE: 
   * Available rules can be found with the URL below using the
   * Rule ID column of the table.
   * https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
   */

  /**
   * Initializing axe DevTools with webdriver client
   * Analyzing client URL and creating a `results` object
   * `axeReporter` now holds onto results object from this test
   */
  it("check the accessibility violations", async () => {
    const attest = new AxeDevToolsWebdriverIO({ client });
    const results = await attest.analyze(); 
    axeReporter.logTestResult(`homepage`, results);
    expect(results.violations.length).to.equal(0);
  });

  /** 
     * WITH RULES - Only tests using the rule(s) in the param.
     * .withRules(string | string[])
     * 
     * Analyzes a page with only the rules `html-has-lang` and `image-alt`
     * Creates a `results` object based on the rules above only
     * `reporter` now holds onto the result of this test
     */
   it("test page with specific rules", async () => {
    const attest = new AxeDevToolsWebdriverIO({ client });
    const results = await attest.withRules(['html-has-lang', 'image-alt']).analyze();
    axeReporter.logTestResult(`homepage-two-rules`, results);
    expect(results.violations.length).to.equal(0);
  });

  /**
   * DISABLE RULES - Allows you to disable rule(s) when running axe DevTools
   * .disableRules(string | string[])
   * 
   * Analyzes a page disabling the `color-contrast` rule
   * Creates a `results` object
   * `reporter` now holds onto the result of this test
   */

  it("test page with disabled rules", async () => {
    const attest = new AxeDevToolsWebdriverIO({ client });
    const results = await attest.disableRules('color-contrast').analyze();
    axeReporter.logTestResult(`homepage-disabled-rule`, results);
    expect(results.violations.length).to.equal(0);
  });
  
  /**
   * EXCLUDE && INCLUDE
   * The included element could live inside the excluded element and be analyzed. For example, if the #content is living inside the #control-panel, only the element and its children in #content will be analyzed.
   * 
   * Analyzes a page that excludes element `#control-panel` but includes element `#content`
   * Creates a `results` object
   * `reporter` now holds onto the result of this test
   */
  it("test page excluding and including certain content on the page", async () => {
    const attest = new AxeDevToolsWebdriverIO({ client });
    const results = await attest.exclude('#control-panel').include('#content').analyze();
    axeReporter.logTestResult(`homepage-exclude-include-rules`, results);
    expect(results.violations.length).to.equal(0);
  });

});
