![logo](./docs/logo-angular_karma.png)
# axe DevTools Browser package and Angular-karma with jasmine Sample Project

<p align="center">  
  <img src="https://www.deque.com/wp-content/uploads/2020/04/axe-devtools.svg" height="70px" width="100px" alt="" />
</p>

[axe DevTools](https://www.deque.com/axe/devtools/) is the most powerful and accurate accessibility toolkit that can get 80% issue coverage—or more—during development. Axe DevTools save money, time, and effort.

Using axe DevTools Browser package and  Angular-karma binding, you can integrate axe DevTools into your existing testing environment instead of building your testing environment around axe DevTools.

# axe-DevTools-api Browser packae and Angular-karma API Example

This example project demonstrates how axe-DevTools-api browser package and Angular-karma integrate to detect the accessibility issues in the angular components created and generates reports in CSV, HTML, JSON, and XML formats.


## Prerequisites

- npm
- NodeJS (6.10 or higher)


## Clone Project

Follow these steps to clone and navigate to the directory:

1. Clone example project **`angular-karma`** from GitHub.
2. Open the project folder in the code editor.
3. Open the terminal, and then navigate from the project root to the example.

```sh
cd Node/angular-karma
```

## Install Dependencies

Install the dependencies **axe DevTools Browser** and **axe DevTools Reporter** for the project.

> **_NOTE:_**
> You need a valid license to access and use our APIs and example projects. For more information, see [Install from Deque’s Agora](https://docs.deque.com/devtools-html/4.0.0/en/node-br-install-agora) page. After configuring the access to Deque private registry, you can install the dependencies for this project.
> The following command installs all the required dependencies **`@axe-devtools/browser`** and **`@axe-devtools/reporter`** as mentioned in the **`package.json`** to run the example project.

```sh
npm install
```

## Run Test File
There are multiple components that have been created as part of this example project. All of these components are present in the **_src/app_**. The different components are _alert-details_, _default-component_, _landing-page_, _product-details_, and _product-shop_.
Each of these components have their own  html, css, .ts and .spec files.
The _product-details_ component's test file i.e _product-details.component.spec.ts_ is the test file in which we have integrated axe-devtools-api browser package to find out the a11y issues in the component once it is rendered by the angular test bed and karma runner.This test file shows how to set up the axe DevTools Browser and Reporter APIs and test for accessibility.

The following command runs the all the tests present in the project..

```sh
npm test
```

## Test Results

The test file generates results in the **_a11y-results_** directory. The report is generated in the **`JSON`** format.

## Configure

**`npm test`** runs the **`rimraf`** command mentioned in the **`package.json`**.

```json
  "scripts": {
    "test": "rimraf rimraf ./a11y-results && ng test"
  },
```

Every time you run the **`npm test`**, the **`rimraf`** command clears all saved results from the **`a11y-results`** directory, so if you want to retain previous test results, you should remove **`rimraf`** from the **`scripts`** object.


If you want to modify this project and publish your results in a different folder other than **`./ally-results`**, you should update the directory as intended in the **`karma.conf.js`** file. The reporter package has been configured in the karma.conf.js as a plugin where the path to the generated reports has been set. 

```js
  reporters: ['progress', 'kjhtml', 'axeDevTools'],
    axeDevToolsReporter: {
      dir: 'a11y-results'
    },
```