package example;

import java.io.File;
import java.io.IOException;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import com.deque.html.axecore.results.Results;
import com.deque.html.axedevtools.selenium.*;
import com.deque.html.axedevtools.selenium.reporter.*;

public class exampleTest {
  private static AxeReportingOptions _reportOptions = new AxeReportingOptions();
  private static WebDriver driver = null;
  private static AxeDriver axedriver = null;
  private static AxeSelenium axeSelenium = null;

@BeforeClass
public static void initiate_drivers() {
    _reportOptions = new AxeReportingOptions();
    WebDriverManager.edgedriver().setup();
    driver = new EdgeDriver();  
    axedriver = new AxeDriver(driver);
    axeSelenium = new AxeSelenium();
    AxeConfiguration.configure().testSuiteName("Test").outputDirectory("axe-json-reports/");
}


  @Test
  public void test_a11y_workshop_homepage() {
    driver.get("https://broken-workshop.dequelabs.com/");
    Results results1 =
        axeSelenium.logResults(_reportOptions.uiState("Homepage_scan")).run(axedriver);
  }

  @Test
  public void test_recipe_card_a11y_workshop_homepage() {
    driver.get("https://broken-workshop.dequelabs.com/");
    driver
        .findElement(
            By.cssSelector(
                "#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button"))
        .click();
    Results results2 =
        axeSelenium.logResults(_reportOptions.uiState("Recipe_card_scan")).run(axedriver);
  }

  @AfterClass
  public static void reporting() throws IOException {
    Runtime rt = Runtime.getRuntime();
    String reporter = new File("src/test/resources/reporter.exe").getAbsolutePath();
    String Logger = new File("axe-json-reports/").getAbsolutePath();
    String Destination = new File("a11y-results/").getAbsolutePath();
    String command_xml =
        reporter + " " + Logger + " --destination " + Destination + " --format xml";
    String command_html =
        reporter + " " + Logger + " --destination " + Destination + " --format html";
    String command_csv =
        reporter + " " + Logger + " --destination " + Destination + " --format csv";
    try {
      rt.exec(command_html);
      rt.exec(command_csv);
      rt.exec(command_xml);
    } catch (Exception e) {
      e.printStackTrace();
    }
    driver.quit();
  }
}
