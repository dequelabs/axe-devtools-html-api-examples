# Axe DevTools WebdriverIO Example

## Prerequisites
  * NPM
  * NodeJS (6.10 or higher)

## Integration information
In order to use this sample project, you will need to install axe DevTools WebdriverIO and the DevTools Reporter as dependencies via NPM or Yarn. These dependencies are included in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/webdriverio/install-agora.html) on the Deque documentation site.

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
