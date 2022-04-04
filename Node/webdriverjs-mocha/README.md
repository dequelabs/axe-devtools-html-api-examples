# axe DevTools WebdriverJS Sample Project

<p align="center">
        <img src="https://avatars2.githubusercontent.com/u/8770005?s=400&v=4" alt="" height="70px" width="100px"  />   
<img src="https://www.deque.com/wp-content/uploads/2020/04/axe-devtools.svg" height="70px" width="100px" alt="" />
</p>

## Prerequisites
  * npm
  * NodeJS (6.10 or higher)
  * Selenium WebDriverJS

## Installation information
In order to use this sample project, you will need to clone the repository from GitHub. Once you've done that, in your terminal, navigate from the project root back to this example.
```
cd node/webdriverjs
``` 
Next, you'll need to install the dependencies for this project including axe DevTools WebDriverJS and the DevTools Reporter. They are already listed in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/webdriverjs/install-agora.html) on the Deque documentation site. Once your access to Deque's private registry has been configured, dependencies for this project can be installed as normal through yarn or npm.
```
npm install
```

## Running the test cases
Use this command to run the examples:
```
npm test
```

## Project Setup
The sample test file is held within the `_tests_` directory. This file contains an example of how to set up the axe DevTools WebDriverJS and Reporter APIs, test for accessibility, and generate formatted results. 

Once the sample project has been run, results can be found in the `a11y-results` folder. The user-named `homepageFlows` folder will contain the raw JSON results, and the html, csv, and xml report formats will be contained within their respective folders. The HTML folder will contain an additional file, which aggregates the results from all the scans performed.

## Running the test cases
`npm test` runs the following command:

```json
  "scripts": {
    "test": "rimraf ./a11y-results && mocha _tests_ --colors --timeout 60000",
  },
```
The `rimraf` command will clear any saved results, so if you want to store previous runs you should remove this part of the run command. If you modify this project and want to publish your results in a different folder other than `./ally-results` then you should update the `dir` here as well. 

