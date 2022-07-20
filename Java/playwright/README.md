![logo](./docs/logo-java-playwright.png)

# axe DevTools Java Playwright API Example

Using axe DevTools Java Playwright, you can integrate axe DevTools into your existing testing environment. This example project demonstrates how axe DevTools Java Playwright is used to detect accessibility issues and generates reports in CSV, HTML, JSON, and XML formats.

## Prerequisites

Java 8 or higher

## Clone Project

Follow these steps to clone and navigate to the directory:
1. Clone this repo from GitHub.
2. Open the project in your favourite Java IDE.
3. Navigate from the root of the repo to this example with the following command:

```sh
cd Java/playwright
```

## Binary Reporter

Download the respective [Binary reporter](https://docs.deque.com/devtools-html/4.0.0/en/downloads#binary-reporter) for your operating system and place it in the **_src/test/resources_** directory.

## Install Dependencies

Install the dependencies including **axe DevTools Java Selenium** and **Playwright** for the project.

> **_NOTE:_**
>You need a valid license to use our APIs. For more information, see [Install from Deque’s Agora](https://docs.deque.com/devtools-html/4.0.0/en/java-install-agora) page. After configuring the access to Deque's private registry, you can install the dependencies for this project.

The following command installs all the required dependencies to run this example project.

```sh
mvn clean install
```

## Run Tests

The **_/src/test/java/org/example_** directory contains the file **`example_Test.java`** that analyzes the page `https://broken-workshop.dequelabs.com/` for accessibility issues.

The following command runs the file in the **_/src/test/java/org/example_** directory.

```sh
mvn test
```

## Test Results

The tests generate results in the **_a11y-results_** directory if you have installed the [Binary reporter](https://docs.deque.com/devtools-html/4.0.0/en/downloads#binary-reporter). Otherwise, they generate only JSON results.

The **`executive-report.html`** file is an executive summary report aggregating results from all scans into one page.

Every time you run **`mvn test`**, it replaces all previously saved results with the latest results in the **`a11y-results`** directory, so if you want to retain previous test results, you should rename or save them in a different directory. 

If you want to modify this project and publish your results in a folder other than **`ally-results`**, you should update the output directory in the **`example_Test.java`** file. 

## Additional Information

- [axe DevTools Java Playwright Overview](https://docs.deque.com/devtools-html/4.0.0/en/java-test-playwright)
- [Java Playwright API Reference](https://docs.deque.com/devtools-html/4.0.0/en/java-api-playwright)
- [axe-core Rule Descriptions](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)