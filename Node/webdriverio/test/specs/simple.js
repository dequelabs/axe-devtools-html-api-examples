const { AxeDevToolsWebdriverIO } = require("@axe-devtools/webdriverio");
const webdriverio = require("webdriverio");

let client;

describe("simple amazon page", () => {
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
    await client.url("https://amazon.com");
  });

  afterEach(async () => {
    await client.deleteSession();
  });


  it("console.log the accessibility violations", async () => {
    const attest = new AxeDevToolsWebdriverIO({ client }).disableFrame("iframe");
    const results = await attest.analyze();
    console.log(results.violations);
  });
});
