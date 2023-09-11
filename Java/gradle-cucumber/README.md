# axe DevTools Java Cucumber with Gradle API Example

Using axe DevTools Java Cucumber with Gradle, you can integrate axe DevTools into your existing testing environment. This example project demonstrates how axe DevTools Java JUnit with Gradle is used to detect accessibility issues and generates report in JSON format.

## Prerequisites

Java 8 or higher
Gradle 7.5.1 or higher

## Clone Project

Follow these steps to clone and navigate to the directory:
1. Clone this repo from GitHub.
2. Open the project in your favourite Java IDE.
3. Navigate from the root of the repo to this example with the following command:

```sh
cd Java/gradle-cucumber
```

## Install Dependencies

Install the dependencies including **axe DevTools Cucumber** for the project.

> **_NOTE:_**
>You need a valid license to use our APIs. For more information, see [Deque’s Agora](https://docs.deque.com/devtools-html/4.0.0/en/java-install-agora#accessing-your-api-key) page.

Open **build.gradle** and enter credentials, `$mavenUser` as email and `$mavenPassword` as API Key.

After configuring the access to Deque's private registry, you can install the dependencies for this project.

The following command installs all the required dependencies and runs this example project.

```sh
gradle buildDependents
```

The **_/src/test/java/gradle/cucumber_** directory contains the file **`ExampleTest.java`** that analyzes the page `http://abcdcomputech.dequecloud.com/` for accessibility issues.

The following comand runs the test again.

```sh
gradle clean test
```

## Test Results

The tests generate JSON results in the **_target/axe-report/_** directory.

## Additional Information

- [axe DevTools Java Overview](https://docs.deque.com/devtools-html/4.0.0/en/java-use-overview)
- [Write Tests with Cucumber](https://docs.deque.com/devtools-html/4.0.0/en/java-test-cucumber)
- [axe-core Rule Descriptions](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)
