package com.deque;

import com.deque.html.axedevtools.selenium.AxeConfiguration;
import com.deque.html.axedevtools.selenium.AxeDriver;
import com.deque.html.axedevtools.selenium.reporter.AxeReportingOptions;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.io.File;

import static com.deque.html.axedevtools.matchers.IsAccessible.isAxeClean;
import static org.hamcrest.MatcherAssert.assertThat;

public class AxeDTCustomConfigTest {
  String absolutePath = new File("src/main/webapp/index.html").getAbsolutePath();
  AxeDriver axeDriver;

  private WebDriver webDriver;
  private AxeReportingOptions _reportOptions = new AxeReportingOptions();
  static String macReporter = new File("src/test/resources/axe-macos").getAbsolutePath();

  @BeforeTest
  public void setUp() throws Exception {
    AxeConfiguration.configure()
        .forAuditSuite(getClass().getResource("resources/config/attest.json"))
        .withAxeScript(getClass().getResource("/axe.js"))
        .testSuiteName("Homepage")
        .outputDirectory("target/axe-results-config-test");

    ChromeOptions options = new ChromeOptions();
    options.addArguments("headless");

    webDriver = new ChromeDriver(options);
    axeDriver = new AxeDriver(webDriver);

    webDriver.get("file:///" + absolutePath);
  }

  @AfterTest
  public void tearDown() {
    webDriver.quit();
  }

  @Test(groups = {"a11yTest"})
  public void auditHomePageForAccessibility() {
    assertThat(axeDriver, isAxeClean().logResults(_reportOptions.uiState("Homepage All")));
  }

  @Test(groups = {"a11yTest"})
  public void auditHomePageWithOptions() throws Exception {
    assertThat(
        axeDriver,
        isAxeClean()
            .within(".jumbotron")
            .skipping("color-contrast")
            .accordingTo("wcag2a")
            .logResults(_reportOptions.uiState("Homepage section")));
  }

  @Test(groups = {"a11yTest"})
  public void auditHomePageWithExclusions() {
    assertThat(
        axeDriver,
        isAxeClean()
            .excluding(".jumbotron")
            .logResults(_reportOptions.uiState("Homepage excluding section")));
  }

  @Test(groups = {"a11yTest"})
  public void auditHomePageWithCertainChecks() {
    assertThat(
        axeDriver,
        isAxeClean()
            .checkingOnly("label", "aria-roles", "html-has-lang")
            .logResults(_reportOptions.uiState("Homepage with certain checks")));
  }
}
