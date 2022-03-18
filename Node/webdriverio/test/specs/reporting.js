const AxeDevToolsReporter = require("@axe-devtools/reporter").default;;
const { AxeDevToolsWebdriverIO } = require("@axe-devtools/webdriverio");
const webdriverio = require("webdriverio");

let client;
const reportDir = "./a11y-results";
const googleReporter = new AxeDevToolsReporter("google.com site", reportDir);

describe("reporting on google page", () => {
  beforeEach(async () => {
    client = await webdriverio.remote({
      port: 4444,
      path: "/wd/hub",
      services: ["chromedriver", "selenium-standalone"],
      capabilities: {
        browserName: "chrome"
      },
      logLevel: "error"
    });
    await client.url("https://google.com");
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  after(async () => {
    await googleReporter.buildHTML(reportDir);
    await reporter.buildJUnitXML(reportDir);
    await reporter.buildCSV(reportDir);
  });

  it("should have the right title", async () => {
    const title = await client.getTitle();
    expect(title).to.equal("Google");
  });

  it("google should have accessibility violations", async () => {
    const attest = new AxeDevToolsWebdriverIO({ client });
    const results = await attest.analyze();
    googleReporter.logTestResult(`homepage`, results);
    expect(results.violations.length).to.be.gt(0);
  });
});
