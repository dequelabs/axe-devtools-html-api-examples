package example;

import com.deque.html.axecore.results.Results;
import com.deque.html.axedevtools.selenium.AxeConfiguration;
import com.deque.html.axedevtools.selenium.AxeDriver;
import com.deque.html.axedevtools.selenium.AxeSelenium;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.junit.jupiter.api.extension.TestWatcher;
import org.openqa.selenium.By;
import org.openqa.selenium.MutableCapabilities;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import com.deque.html.axedevtools.selenium.reporter.*;

/**
 * Accessibility Tests with Deque Library.
 */
public class exampleTestMobileBrowserOnSauceEmuAndroid {
    public AppiumDriver driver;
    private static AxeDriver axedriver = null;
    private static AxeSelenium axeSelenium = null;
    private static AxeReportingOptions _reportOptions = new AxeReportingOptions();

    @RegisterExtension
    public SauceTestWatcher watcher = new SauceTestWatcher();

    @BeforeEach
    public void setup(TestInfo testInfo) throws MalformedURLException {
        axeSelenium = new AxeSelenium();
        AxeConfiguration.configure().testSuiteName("Test").outputDirectory("axe-json-reports/");

        MutableCapabilities caps = new MutableCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("browserName", "Chrome");
        // caps.setCapability("appium:deviceName", "Android GoogleAPI Emulator");
        caps.setCapability("appium:deviceName", "Google.*");
        caps.setCapability("appium:platformVersion", "15");
        caps.setCapability("appium:automationName", "UiAutomator2");
        MutableCapabilities sauceOptions = new MutableCapabilities();
        // sauceOptions.setCapability("appiumVersion", "2.11.0");
        sauceOptions.setCapability("appiumVersion", "latest");
        sauceOptions.setCapability("username", System.getenv("SAUCE_USERNAME"));
        sauceOptions.setCapability("accessKey", System.getenv("SAUCE_ACCESS_KEY"));
        sauceOptions.setCapability("build", "mobile web build");
        sauceOptions.setCapability("name", "mobile web test");
        sauceOptions.setCapability("deviceOrientation", "PORTRAIT");
        caps.setCapability("sauce:options", sauceOptions);

        // Start the session
        URL url = new URL("https://ondemand.eu-central-1.saucelabs.com:443/wd/hub");

        try {
            driver = new AndroidDriver(url, caps);
            axedriver = new AxeDriver(driver);
        } catch (Exception e) {
            System.out.println("An Error Occurred creating the driver object: " + e);
        }
    }

    @DisplayName("Recipe Homepage A11y Test")
    @Test
    public void test_a11y_workshop_homepage() {
        driver.navigate().to("https://broken-workshop.dequelabs.com/");
        Results accessibilityResults = axeSelenium.logResults(_reportOptions.uiState("Homepage_scan")).run(axedriver);
        Assertions.assertEquals(3, accessibilityResults.getViolations().size());
    }

    @DisplayName("Recipe Card A11y Test")
    @Test
    public void test_recipe_card_a11y_workshop_homepage() {
        driver.navigate().to("https://broken-workshop.dequelabs.com/");
        driver
                .findElement(
                        By.cssSelector(
                                "#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button"))
                .click();
        Results accessibilityResults = axeSelenium.logResults(_reportOptions.uiState("Recipe_card_scan"))
                .run(axedriver);
        Assertions.assertEquals(3, accessibilityResults.getViolations().size());
    }

    public class SauceTestWatcher implements TestWatcher {
        @Override
        public void testSuccessful(ExtensionContext context) {
            driver.executeScript("sauce:job-result=passed");
            driver.quit();
        }

        @Override
        public void testFailed(ExtensionContext context, Throwable cause) {
            driver.executeScript("sauce:job-result=failed");
            driver.quit();
        }
    }

    @AfterAll
    public static void reporting() throws IOException {
        Runtime rt = Runtime.getRuntime();
        String reporter = new File("src/test/resources/reporter-cli-macos").getAbsolutePath();
        String Logger = new File("axe-json-reports/").getAbsolutePath();
        String Destination = new File("a11y-results/").getAbsolutePath();
        String command_xml = reporter + " " + Logger + " --destination " + Destination + " --format xml";
        String command_html = reporter + " " + Logger + " --destination " + Destination + " --format html";
        String command_csv = reporter + " " + Logger + " --destination " + Destination + " --format csv";
        try {
            rt.exec(command_html);
            rt.exec(command_csv);
            rt.exec(command_xml);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
