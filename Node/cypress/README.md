# Axe DevTools Cypress Example

## Prerequisites
  * NPM
  * NodeJS (6.10 or higher)
  * Cypress - installed globally

## Installation information
In order to use this sample project, you will need to install axe DevTools Cypress and the DevTools Reporter as dependencies via NPM or Yarn. These dependencies are included in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/cypress/install-agora-cypress.html) on the Deque documentation site.

Once access to Deque's private registry has been configured, dependencies for this project can be installed as normal through npm or yarn.

## Running the test cases
`npm test` runs the following command:

```json
  "scripts": {
    "test": "cypress open"
  },
```

There are three examples that exist within this project which show cases different functionality and content of the axeDevTools.
<br/><br/>
The test case <b>[computers.spec.js](./cypress/integration/computers.spec.js)</b> showcases an example testing an entire page for accessibility and creating a report. 
<br/><br/>
The second test case <b>[home.spec.js](./cypress/integration/home.spec.js)</b> showcases an example using specific rules and creating a report. 
<br/><br/>
The third test case <b>[reporter.spec.js](./cypress/integration/reporter.spec.js)</b> showcases an example creating different reporting options (HTML, CSV, XML) after all test cases have run.

## Reports

The raw JSON results and processed reports for the example test cases are output in the `a11y-results` folder and are named based on their test cases. There are three options for report formats with the DevTools Reporter: csv, html, and xml. For this sample project, all three are created but any subset of these results can be created in your use case.

## Additional documentation

  * Overview: https://axe-devtools-html-docs.deque.com/reference/node/cypress/overview-cypress.html
  * API: https://axe-devtools-html-docs.deque.com/reference/node/cypress/api-cypress.html
  * Rules: https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
