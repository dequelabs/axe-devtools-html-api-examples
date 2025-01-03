package example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebElement;

import io.appium.java_client.android.AndroidDriver;

import java.io.File;
import java.io.IOException;
import java.io.FileWriter;

import java.net.MalformedURLException;
import java.net.URL;

import java.time.Duration;

import java.util.Map;
import java.util.Set;
import java.util.LinkedHashMap;

import org.json.JSONObject;

import com.google.common.collect.ImmutableMap;

/**
 * Accessibility Tests with Deque Library.
 */
public class exampleTestMobileWebViewLocalEmuAndroid {
    public AndroidDriver driver;
    private static Map<String, String> settings = null;
    String directoryPath = "axe-json-reports";
    String fileName;

    @BeforeEach
    public void setup(TestInfo testInfo) throws MalformedURLException {
        String testApp = new File("src/test/resources/app/sauceDemo271.apk").getAbsolutePath();

        MutableCapabilities caps = new MutableCapabilities();
        caps.setCapability("appium:automationName", "AxeUiAutomator2");
        caps.setCapability("appium:deviceName", "emulator-5554");
        caps.setCapability("appium:orientation", "PORTRAIT");
        caps.setCapability("appium:appPackage", "com.swaglabsmobileapp");
        caps.setCapability("appium:app", testApp);
        caps.setCapability("platformName", "Android");
        caps.setCapability("appium:appWaitActivity", "com.swaglabsmobileapp.MainActivity");
        // to facilitate webview testing
        caps.setCapability("appium:chromedriver_autodownload", true);

        // Start the session
        URL url = new URL("http://127.0.0.1:4723/wd/hub");

        try {
            driver = new AndroidDriver(url, caps);
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
            settings = ImmutableMap.of("apiKey", System.getenv("AXE_MOBILE_API_KEY"));
        } catch (Exception e) {
            System.out.println("An Error Occurred creating the driver object: " + e);
        }
    }

    @SuppressWarnings("unchecked")
    @DisplayName("Test Swag Labs")
    @Test
    public void swaglabs_app() throws InterruptedException {
        // 1 - scan the home page
        LinkedHashMap<String, Object> axeMobileResults = (LinkedHashMap<String, Object>) driver
                .executeScript("mobile: axeScan", settings);
        JSONObject mobileResults = new JSONObject(axeMobileResults);
        String fileName = "axe-mobile-results-1.json";
        saveJsonToFile(mobileResults, directoryPath, fileName);

        // 2 - log in to the app
        // 2.1 - enter the userid
        WebElement el1 = driver.findElement(By.xpath("//android.widget.EditText[@content-desc='test-Username']"));
        el1.sendKeys("standard_user");
        el1 = null;

        // 2.2 - enter the password
        el1 = driver.findElement(By.xpath("//android.widget.EditText[@content-desc='test-Password']"));
        el1.sendKeys("secret_sauce");
        el1 = null;

        // 2.3 - click the LOGIB button
        el1 = driver.findElement(By.xpath("//android.widget.TextView[@text='LOGIN']"));
        el1.click();
        el1 = null;

        // 3 - navigate the menu to navigate to the test webview page
        // 3.1 0 click the hamburger menu
        el1 = driver.findElement(By.xpath(
                "//android.view.ViewGroup[@content-desc='test-Menu']/android.view.ViewGroup/android.widget.ImageView"));
        el1.click();
        el1 = null;

        // 3.2 navigate to the WebView selection page
        el1 = driver.findElement(By.xpath(
                "//android.widget.TextView[@text='WEBVIEW']"));
        el1.click();
        el1 = null;

        // 4 - enter the webpage to use for testing the webview
        el1 = driver.findElement(By.xpath(
                "//android.widget.EditText[contains(@content-desc,'test-enter')]"));
        el1.sendKeys("www.saucedemo.com");
        el1 = null;

        // 5 - click 'GO TO SITE' to navigate to the page to test in the webview
        el1 = driver.findElement(By.xpath("//android.widget.TextView[@text='GO TO SITE']"));
        el1.click();
        el1 = null;

        // 6 - experimentally scan this page with mobile axe scanner
        axeMobileResults = null;
        axeMobileResults = (LinkedHashMap<String, Object>) driver.executeScript("mobile: axeScan", settings);
        mobileResults = null;
        mobileResults = new JSONObject(axeMobileResults);
        fileName = "axe-mobile-results-2.json";
        saveJsonToFile(mobileResults, directoryPath, fileName);

        // 7 - now switch to the web context and use the web Axe scanner
        // 7.1 - Get the available contexts
        Set<String> contexts = driver.getContextHandles();
        String webContext = "";
        for (String context : contexts) {
            System.out.println(context);
            if (context.contains("WEBVIEW")) {
                webContext = context;
            }
        }

        // 7.2 Switch to the web context
        driver.context(webContext);
        // let's check to make sure the webview is really loaded
        try {
            el1 = driver.findElement(By.xpath("/html/body"));
        } catch (Exception e) {
            System.out.println("An Error Occurred finding element in webview: " + e);
        }

        // Run AXE accessibility tests

        String script = "var script = document.createElement('script');"
                + "script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js';"
                + "var callback = arguments[arguments.length - 1];"
                + "script.onload = function () {"
                + " axe.run("
                + "    document,"
                + "    {"
                + "       runOnly: {"
                + "         type: 'tag',"
                + "         values: ['wcag2aaa', 'best-practice']"
                + "       }"
                + "    },"
                + "    function (err, results) {"
                + "      callback(JSON.stringify(results));"
                + "    }"
                + " );"
                + "};"
                + "document.head.appendChild(script);";

        // Inject the JavaScript into the page and capture the results
        String axeResults = (String) ((JavascriptExecutor) driver).executeAsyncScript(script);
        // Parse the results into a JSONObject
        JSONObject results = new JSONObject(axeResults);
        // write the JSON results to the local filesystem
        fileName = "axe-devtools-results-1.json";
        // Save JSON to file
        saveJsonToFile(results, directoryPath, fileName);

        // Print the results
        System.out.println(results.toString(2));

        driver.context("NATIVE_APP");

        Thread.sleep(10000);

        driver.quit();
    }

    public static void saveJsonToFile(JSONObject jsonObject, String directoryPath, String fileName) {
        // Create the directory if it doesn't exist
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Create the file
        File file = new File(directoryPath + File.separator + fileName);
        try (FileWriter fileWriter = new FileWriter(file)) {
            // Write the JSON object to the file
            fileWriter.write(jsonObject.toString(2)); // Pretty print with an indentation of 2 spaces
            System.out.println("JSON file created successfully at " + file.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
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