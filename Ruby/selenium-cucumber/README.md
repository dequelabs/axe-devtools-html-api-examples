![logo](./docs/logo-ruby-cucumber-selenium.png)

# axe DevTools Ruby Cucumber with Selenium API Example

Using axe DevTools Ruby Cucumber with Selenium, you can integrate axe DevTools into your existing testing environment. This example project demonstrates how axe DevTools Ruby Cucumber with Selenium is used to detect accessibility issues and generates reports in CSV, HTML, JSON, and XML formats.

## Prerequisites

Ruby greater than version 2.6.0 along with the Bundler

## Clone Project

Follow these steps to clone and navigate to the directory:
1. Clone this repo from GitHub.
2. Open the project in your favourite code editor.
3. Navigate from the root of the repo to this example with the following command:

```sh
cd Ruby/selenium-cucumber
```

## Binary Reporter

Follow these steps to add binary reporter for publishing results:

Download the respective [Binary reporter](https://docs.deque.com/devtools-html/4.0.0/en/downloads#binary-reporter) and place it in the **_resources_** directory.

### MAC Operating System (Default)

The default file set to MAC Operating System users.

```sh
    reporter = (Dir.pwd)<<'/resources/reporter-cli-macos'
```

Other than MAC Operating System users, open the **features/support/env.rb** file and modify the file as per your operating system.

### Linux Operating System Users

Update the line 16 as follows:

```sh
    reporter = (Dir.pwd)<<'/resources/reporter-cli-linux'
```

### Windows Operating System Users

Update the line 16 as follows:

```sh
    reporter = (Dir.pwd)<<'/resources/reporter-cli-win.exe'
```

## Install Dependencies

Install the dependencies including **axe DevTools Selenium** and **DevTools Cucumber** for the project.

> [!NOTE]
>You need a valid license to use our APIs. For more information, see [NPM registry setup](https://dequeuniversity.com/guide/attest/2.11/getting-started/npm-setup/) page. After configuring the access to Deque's private registry, you can install the dependencies for this project.

### Set up Bundle Configuration

Follow these steps to create bundle config file:

1. Open the terminal and run the following commands to create cgi username and password.

    a. Run the following command to activate Ruby.

    ```sh
    irb
    ```

    b. Run the following command to trigger cgi.

    ```sh
    require "cgi"
    ```

    It returns `true`.

    c. Run the following command to cgi email id.

    ```sh
    CGI.escape "email-id"
    ```

    It returns cgi escaped email.

    d. Run the following command to cgi api key.

    ```sh
    CGI.escape "api-key"
    ```

    It returns cgi escaped api key.

2. Run the following command to create the config file.

```sh
bundle config agora.dequecloud.com <username>:<api-key> 
```

It creates the config file with your credentials.

The following command installs all the required dependencies to run this example project.

```sh
bundle install
```

## Run Tests

The **_features_** directory contains the example test files **`example_spec.feature`** and **`custom_steps.rb`** that analyzes the page `https://broken-workshop.dequelabs.com/` for accessibility issues.

The following command runs the test files in the **features** directory.

```sh
bundle exec cucumber
```

## Test Results

The tests generate results in the **_a11y-results_** directory.

The **`executive-report.html`** file is an executive summary report aggregating results from all scans into one page.

Every time you run **`bundle exec cucumber`**, it replaces all previously saved results with the latest results in the **`a11y-results`** directory, so if you want to retain previous test results, you should rename or save them in a different directory. 

If you want to modify this project and publish your results in a folder other than **`./ally-results`**, you should update the output directory in the **`features/support/env.rb`** file.

## Additional Information

- [axe DevTools Ruby Overview](https://docs.deque.com/devtools-html/4.0.0/en/rb-introduction)
- [Ruby Cucumber API Reference](https://docs.deque.com/devtools-html/4.0.0/en/rb-cucumber#api)
- [axe-core Rule Descriptions](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)