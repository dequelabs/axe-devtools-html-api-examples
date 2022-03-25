# Axe DevTools WebdriverIO Example

## Prerequisites
  * NPM
  * NodeJS (6.10 or higher)

## Installation information
In order to use this sample project, you will need to install axe DevTools WebdriverIO and the DevTools Reporter as dependencies via NPM or Yarn. These dependencies are included in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/webdriverio/install-agora.html) on the Deque documentation site.

Once access to Deque's private registry has been configured, dependencies for this project can be installed as normal through npm or yarn.

## Project Setup
The sample test file is held within the `_tests_` directory. This file contains an example of how to set up the axe DevTools Puppeteer and Reporter APIs, test for accessibility, and generate formatted results. 

Once the sample project has been run, formatted results can be found in the a11y-results folder. The user-named homepageFlows folder will contain the raw JSON results, and the HTML, CSV, and XML report formats will be contained within their respective folders. The HTML folder will contain an additional file, which aggregates the results from all the scans performed.

## Running the test cases
`npm test` runs the following command:

```json
"scripts": {
    "test": "rimraf ./a11y-results && wdio run ./wdio.conf.js"
  },
```

For a complete guide on testing and to see a sample file, look at [google-a11y.js](./test/google-a11y.js).

The other test files showcase simpler integrations with axe DevTools WebdriverIO

## Reports

The reports that are outputted from the example test cases live in the a11y-results folder and are broken out by their specific test cases. 

You can set up axe DevTools reporter to publish a report of the test results. There are three options that it can be published as: csv, html and/or xml.

## Additional documentation

  * Overview: https://axe-devtools-html-docs.deque.com/reference/node/webdriverio/overview.html
  * API: https://axe-devtools-html-docs.deque.com/reference/node/webdriverio/ref-overview.html
  * Rules: https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
