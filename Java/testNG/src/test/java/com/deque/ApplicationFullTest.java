package com.deque;

import com.deque.html.axedevtools.selenium.*;
import com.deque.html.axedevtools.selenium.results.*;
import com.deque.html.axedevtools.selenium.reporter.*;
import static com.deque.html.axedevtools.matchers.IsAccessible.isAxeClean;
import static com.deque.html.axedevtools.matchers.IsAuditedForAccessibility.isAuditedForAccessibility;
import org.testng.annotations.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import static org.hamcrest.MatcherAssert.assertThat;

public class ApplicationFullTest {

  AxeDriver axeDriver;
  private WebDriver webDriver;
  private AxeReportingOptions _reportOptions = new AxeReportingOptions();

  @BeforeTest
  public void setUp() throws Exception {
    AxeConfiguration.configure()
        .testSuiteName("Deque")
        .outputDirectory("target/axe-results")
        .forRuleset("wcag2");

    ChromeOptions options = new ChromeOptions();
    options.addArguments("headless");
    options.addArguments("disable-gpu");

    webDriver = new ChromeDriver(options);
    axeDriver = new AxeDriver(webDriver);
  }

  @AfterTest
  public void tearDown() throws Exception {
    webDriver.quit();
  }

  @Test(groups = {"a11yTest"})
  public void auditTestPageForAccessibility() throws Exception {
    webDriver.get("https://dequeuniversity.com/demo/mars/");
    assertThat(
        axeDriver, isAuditedForAccessibility().logResults(_reportOptions.uiState("Mars Commuter")));
  }

  @Test(groups = {"a11yTest"})
  public void DQUShouldBeAccessible() throws Exception {
    webDriver.get("https://www.dequeuniversity.com");
    assertThat(axeDriver, isAxeClean().logResults(_reportOptions.uiState("Deque University")));
  }

  @Test(groups = {"a11yTest"})
  public void auditMarsCommuterAccessibility() throws Exception {
    webDriver.get("https://dequeuniversity.com/demo/mars/");
    _reportOptions.testSuiteName("Mars Commuter State Change");

    assertThat(
        axeDriver, isAxeClean().logResults(_reportOptions.uiState("Mars Commuter No Change")));

    WebElement planet = webDriver.findElement(By.id("route-type-multi-city"));
    planet.sendKeys("ChromeDriver");
    planet.click();
    assertThat(
        axeDriver, isAxeClean().logResults(_reportOptions.uiState("Mars Commuter Changed State")));
  }
}
