# Axe DevTools Cypress Example

## Prerequisites
  * npm
  * NodeJS (6.10 or higher)
  * [Cypress](https://docs.cypress.io/guides/overview/why-cypress) - installed globally

## Installation information
In order to use this sample project, you will need to clone the repository from GitHub. Once you've done that, in your terminal, navigate from the project root back to this example.
```
cd node/cypresss
``` 

Next, you'll need to install the dependencies for this project including axe DevTools Cypress and the DevTools Reporter. They are already listed in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/cypress/install-agora-cypress.html) on the Deque documentation site. Once your access to Deque's private registry has been configured, dependencies for this project can be installed as normal through yarn or npm.
```
npm install
```

## Running the test cases
Use this command to run the examples:
```
cypress open
```

There are three examples that exist within this project which show different aspects of axe DevTools.
<br/><br/>
The test case <b>[computers.spec.js](./cypress/integration/computers.spec.js)</b> is an example testing a page for accessibility and creating a report. 
<br/><br/>
The second test case <b>[home.spec.js](./cypress/integration/home.spec.js)</b> is an example using specific rules and creating a report. 
<br/><br/>
The third test case <b>[reporter.spec.js](./cypress/integration/reporter.spec.js)</b> is an example creating different reporting options (HTML, CSV, XML) after all test cases have run.

## Results

The raw JSON scan results and formatted reports for the example test cases are output in the `a11y-results` folder and are named based on their test cases. There are three options for report formats with the DevTools Reporter: csv, html, and xml. For this sample project, all three are created but any subset of these results can be created in your use case.

## Additional documentation

  * Overview: https://axe-devtools-html-docs.deque.com/reference/node/cypress/overview-cypress.html
  * API: https://axe-devtools-html-docs.deque.com/reference/node/cypress/api-cypress.html
  * Rules: https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
