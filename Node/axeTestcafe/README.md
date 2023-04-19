<p align="center">
    <a href="https://devexpress.github.io/testcafe">
        <img src="https://raw.githubusercontent.com/DevExpress/testcafe/master/media/testcafe-logo.svg?sanitize=true" alt="testcafe" />       
    </a>
        <img src="https://dequeuniversity.com/assets/images/logos/axe_hero_blue.png" height="50px" width="70px" alt="axe" />
</p>

# AxeTestCafe

An axe-devtools integration for TestCafe.

## Prerequisites

- NodeJS(6.10 or higher)
- Testcafe testing suite
- Chromedriver or Geckodriver

## Installation information

In order to use this sample project, you will need to clone the repository from GitHub. Once you've done that, in your terminal, navigate from the project root back to this example.

```
cd node/testcafe
```

Next, you'll need to install the dependencies for this project like the DevTools Reporter etc.. They are already listed in `package.json`, but access to Deque's private registry is required to install them. Be sure you have configured npm to connect to the Axe registry (https://agora.dequecloud.com/artifactory/api/npm/devtools-npm/) or your connection has been set to your internal repository. Once your access to Deque's private registry has been configured, dependencies for this project can be installed as normal through yarn or npm.

```
npm install
```

## Usage

This module uses a chainable API to assist in injecting, configuring and analyzing
using axe-devtools with TestCafe. As such, it is required to pass an instance of a TestCafe t (testable) object.

Here is an example of a script and use case of AttesAxeTesttCafe

```js
import { axeTestCafe } from "./axeTestCafe";
import AxeDevtoolsReporter from "@axe-devtools/reporter";

const reporter = new AxeDevtoolsReporter(
  "DevTools-Reporter",
  "./a11y-results/json"
);
var axe;

fixture`A set of examples that illustrate how to use TestCafe API`
  .page`https://dequeuniversity.com/demo/mars/`
  .before(async (t) => {
    axe = new axeTestCafe();
  })
  .afterEach(async (t) => {
    await reporter.buildHTML("./test-results/");
  });

test("Accessibility quick scan", async (t) => {
  const results = await axe.ruleSet("wcag2").analyze(t);
  reporter.logTestResult("Main Scan", results);
  await t.expect(results.violations.length).eql(0);
});
```

## API

### AxeTestCafe()

Constructor for AxeTestCafe.

```js
var axe = new axeTestCafe();
```

### AxeTestCafe()#ruleSet

Allow specific ruleset to run on scan. You must set this value, or else best practices will be on by default.
<br/>
Accepted values include

        * wcag2
        * 508
        * wcag21

```js
new axeTestCafe().ruleSet("wcag2");
```

### axeTestCafe#analyze(t, context: Axe.Context, options: Axe.RunOptions)

Performs analysis and passes any encountered error and/or the result object to the provided callback function or promise function.

```js
await new axeTestCafe().analyze(t);
```

### AxeTestCafe#exclude(selector: string | string[])

Add a CSS selector to the list of elements to exclude from analysis

```js
await new axeTestCafe().exclude("#content").analyze(t);
```

### AxeTestCafe#include(selector: string | string[])

Adds a CSS selector to the list of elements to include in analysis

```js
await new axeTestCafe().include("#content").analyze(t);
```

### AxeTestCafe#disableRules(rules: string | string[])

Skips verification of the rules provided. Accepts a String of a single rule ID or an Array of multiple rule IDs.

```js
await new axeTestCafe()
  .ruleSet("wcag2")
  .disableRules(["color-contrast", "button-name"])
  .analyze(t);
```
