# axe DevTools WebdriverJS Sample Project

<p align="center">
        <img src="https://avatars2.githubusercontent.com/u/8770005?s=400&v=4" alt="" height="70px" width="100px"  />   
<img src="https://www.deque.com/wp-content/uploads/2020/04/axe-devtools.svg" height="70px" width="100px" alt="" />
</p>

## Prerequisites
  * NPM
  * NodeJS (6.10 or higher)
  * Selenium WebDriverJS

## Integration information
In order to use this sample project, you will need to install axe DevTools WebDriverJS and the DevTools Reporter as dependencies via NPM or Yarn. These dependencies are included in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/webdriverjs/install-agora.html) on the Deque documentation site.

## Project Setup
The sample test file is held within the `_tests_` directory. This file contains an example of how to set up the axe DevTools WebDriverJS and Reporter APIs, test for accessibility, and generate formatted results. 

Once the sample project has been run, formatted results can be found in the a11y-results folder. The user-named homepageFlows folder will contain the raw JSON results, and the HTML, CSV, and XML report formats will be contained within their respective folders. The HTML folder will contain an additional file, which aggregates the results from all the scans performed.

## Running the test cases
`npm test` runs the following command:

```json
  "scripts": {
    "test": "rimraf ./a11y-results && mocha _tests_ --colors --timeout 60000",
  },
```
The `rimraf` command will clear any saved results, so if you want to store previous runs you should remove this part of the run command. If you modify this project and want to publish your results in a different folder other than `./ally-results` then you should update the `dir` here as well. 

