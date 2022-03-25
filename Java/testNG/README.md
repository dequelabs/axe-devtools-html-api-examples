# axeDevTools Java Hamcrest + testNG Integration

A sample set of test cases that show the use and integration of axeDevTools in the Hamcrest and testNG testing framework.

## Prerequisites

- Maven
  - If you dont have maven here is how to install https://maven.apache.org/install.html
- Java (8+)
- Java JDK
- Selenium webdriver

## Integration information

In order to use this sample project, you will need to install axe DevTools Hamcrest as dependencies via Maven. These dependencies are included in pom.xml, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/java/agora.html) on the Deque documentation site.

## Running the test cases

To run the test case, simply use:

```sh
mvn clean test
```
