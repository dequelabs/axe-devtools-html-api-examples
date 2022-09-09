![logo](./docs/logo-reactdom.png)

# axe DevTools

[axe DevTools](https://www.deque.com/axe/devtools/) is the most powerful and accurate accessibility toolkit that can get 80% issue coverage—or more—during development. Axe DevTools save money, time, and effort.

Using axe DevTools Jest and React DOM webdriver binding, you can integrate axe DevTools into your existing testing environment instead of building your testing environment around axe DevTools.

# axe DevTools Jest and React DOM API Example

This example project demonstrates how axe DevTools Jest and React DOM detects the accessibility issues and generates reports in CSV, HTML, JSON, and XML formats.

## Prerequisites

- npm
- NodeJS (6.10 or higher)

## Clone Project

Follow these steps to clone and navigate to the directory:

1. Clone example project **`jest-reactdom`** from GitHub.
2. Open the project folder in the code editor.
3. Open the terminal, and then navigate from the project root to the example.

```sh
cd Node/jest-reactdom
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

The **_tests_** directory contains the example test file **`index.spec.js`**. This test file shows how to set up the axe DevTools Browser and Reporter APIs, test for accessibility, and generate formatted results.

The following command runs the test file in the **_tests_** directory.

```sh
npm test
```

## Test Results

The test file generates results in the **_a11y-results_** directory. Check each subdirectory for the respective format.

The additional **`HTML`** file is an executive summary report aggregating results from all scans into one page.

## Configure

**`npm test`** runs the **`rimraf`** command mentioned in the **`package.json`**.

```json
  "scripts": {
    "pretest": "rimraf ./a11y-results",
    "test": "jest"
  },
```

Every time you run the **`npm test`**, the **`rimraf`** command clears all saved results from the **`a11y-results`** directory, so if you want to retain previous test results, you should remove **`rimraf`** from the **`scripts`** object.

If you want to modify this project and publish your results in a different folder other than **`./ally-results`**, you should update the directory as intended.

## Related Information

- [axe DevTools Browser Javascript Overview](https://docs.deque.com/devtools-html/4.0.0/en/node-br-overview)
- [Browser Javascript API Reference](https://docs.deque.com/devtools-html/4.0.0/en/node-br-ref-overview)
- [axe-core Rule Descriptions](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)
