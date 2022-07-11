package org.example;
import com.deque.html.maven.axedevtools.utils.reporter.AxeReportingOptions;
import com.microsoft.playwright.*;
import org.apache.commons.io.FileUtils;
import org.junit.*;
import com.deque.html.maven.axedevtools.playwright.AxePlaywrightBuilder;
import com.deque.html.maven.axedevtools.utils.axeresults.AxeResults;
import java.io.File;
import java.io.IOException;


public class example_Test {
    static Playwright playwright = Playwright.create();
    public static AxeReportingOptions _reportOptions = new AxeReportingOptions();
    static Browser browser = null;
    static Page page = null;
    static AxePlaywrightBuilder axePlaywrightBuilder = null;
    static String Logger = new File("axe-reports/").getAbsolutePath();

    @BeforeClass
    public static void delete_json_dir() throws IOException {
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        axePlaywrightBuilder = new AxePlaywrightBuilder(page);
        File file = new File(Logger);
        if (file.exists()){
            FileUtils.deleteDirectory(file);
        }
    }

    @Test
    public void test1(){
        page.navigate("https://broken-workshop.dequelabs.com/");
        AxeResults axeResults = axePlaywrightBuilder.logResults(_reportOptions.uiState("Homepage_scan")).analyze();
    }

    @Test
    public void test2(){
        page.navigate("https://broken-workshop.dequelabs.com/");
        page.locator("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button").click();
        AxeResults axeResults2 = axePlaywrightBuilder.logResults(_reportOptions.uiState("Recipe_card_scan")).analyze();
    }

    @AfterClass
    public static void reporting() throws IOException {
        Runtime rt = Runtime.getRuntime();
        String reporter = new File(
                "src/test/resources/reporter-cli-macos")
                .getAbsolutePath();
        String Destination = "a11y-results/";
        String command_html = reporter +" "+ Logger+" --destination "+Destination+" --format html";
        String command_csv = reporter +" "+ Logger+" --destination "+Destination+" --format csv";
        String command_xml = reporter +" "+ Logger+" --destination "+Destination+" --format xml";
        try {
            rt.exec(command_html);
            rt.exec(command_xml);
            rt.exec(command_csv);
        }
        catch(Exception e){e.printStackTrace();}
        finally {
            browser.close();
        }

    }
}

