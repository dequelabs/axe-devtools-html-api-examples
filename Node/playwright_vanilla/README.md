![logo](./docs/logo.png)

# axe DevTools

[axe DevTools](https://www.deque.com/axe/devtools/) is the most powerful and accurate accessibility toolkit that can get 80% issue coverage—or more—during development. Axe DevTools save money, time, and effort.

Using axe DevTools Playwright webdriver binding, you can integrate axe DevTools into your existing testing environment instead of building your testing environment around axe DevTools.

# axe DevTools Playwright API Example

This example project demonstrates how axe DevTools Playwright webdriver binding detects the accessibility issues and generates reports in CSV, HTML, JSON, and XML formats.

## Prerequisites
- npm
- NodeJS (6.10 or higher)

## Clone Project

Follow these steps to clone and navigate to the directory:
1. Clone example project **`playwright_vanilla`** from GitHub.
2. Open the project folder in the code editor.
3. Open the terminal, and then navigate from the project root to the example.

```sh
cd Node/playwright_vanilla/example-project
```

## Install Dependencies

Install the dependencies **axe DevTools Playwright** and **axe DevTools Reporter** for the project.

> **_NOTE:_**
>You need a valid license to access and use our APIs and example projects. For more information, see [Install from Deque’s Agora](https://docs.deque.com/devtools-html/4.0.0/en/node-pl-install-agora) page. After configuring the access to Deque private registry, you can install the dependencies for this project.

The following command installs all the required dependencies **`@axe-devtools/playwright`**, **`@axe-devtools/reporter`**, and **`uuid`** as mentioned in the **`package.json`** to run the example project.

```sh
npm install
```

## Test Configuration

You can configure multiple browsers as you would like in the **`playwright.config.js`**

```js
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      }
    }]
```

>To learn more about test configuration, see [Playwright documentation](https://playwright.dev/docs/test-configuration).

## Run Test File

The **_tests_** directory contains the example test file **`example.spec.js`**. This test file shows two basic tests **`basic test_1`** and **`basic test_2`** that analyzes the page `https://broken-workshop.dequelabs.com/` for accessibility issues.

The following command runs the test on all the files in the **_tests_** directory with the browser preview.

```sh
npx playwright test --headed
```

The following command runs the test on all the files in the **_tests_** directory without (headless mode) the browser preview.

```sh
npx playwright test
```

The following command runs the mentioned test file with the browser preview.

```sh
npx playwright test <tests/file-name> <--headed>
```

>To learn more about commands, see [Playwright documentation](https://playwright.dev/docs/test-cli).

## Test Results

The test file generates results in the **_a11y-results_** directory. Check each subdirectory for the respective format.

## Related Information

- [axe DevTools Playwright Overview](https://docs.deque.com/devtools-html/4.0.0/en/node-pl-overview)
- [Playwright API Reference](https://docs.deque.com/devtools-html/4.0.0/en/node-pl-ref-overview)
- [axe-core Rule Descriptions](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)
