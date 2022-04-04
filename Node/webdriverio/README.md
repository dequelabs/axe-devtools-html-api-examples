# Axe DevTools WebdriverIO Example

## Prerequisites
  * npm
  * NodeJS (6.10 or higher)

## Installation information
In order to use this sample project, you will need to clone the repository from GitHub. Once you've done that, in your terminal, navigate from the project root back to this example.
```
cd node/webdriverio
``` 
Next, you'll need to install the dependencies for this project including axe DevTools WebdriverIO and the DevTools Reporter. They are already listed in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/webdriverio/install-agora.html) on the Deque documentation site. Once your access to Deque's private registry has been configured, dependencies for this project can be installed as normal through yarn or npm.
```
npm install
```

## Running the test cases
Use this command to run the examples:
```
npm test
```

## Project Setup
The sample test files are held within the `test/specs` directory. They contain examples of how to set up the axe DevTools WebdriverIO and Reporter APIs, test for accessibility, and generate formatted results. 

Once the sample project has been run, results can be found in the `a11y-results` folder.

## Modifying this project
`npm test` runs this command defined in `package.json`

```json
"scripts": {
    "test": "rimraf ./a11y-results && wdio run ./wdio.conf.js"
  },
```

The `rimraf` command will clear any saved results, so if you want to store previous runs you should remove this part of the run command. If you modify this project and want to publish your results in a different folder other than `./ally-results` then you should update the `dir` here as well. 

## Additional documentation

  * Overview: https://axe-devtools-html-docs.deque.com/reference/node/webdriverio/overview.html
  * API: https://axe-devtools-html-docs.deque.com/reference/node/webdriverio/ref-overview.html
  * Rules: https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
