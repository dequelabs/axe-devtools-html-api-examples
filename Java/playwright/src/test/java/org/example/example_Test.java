package org.example;
import com.microsoft.playwright.*;
import org.apache.commons.io.FileUtils;
import org.junit.*;
import com.deque.html.maven.axedevtools.playwright.AxePlaywrightBuilder;
import com.deque.html.maven.axedevtools.utils.axeresults.AxeResults;
import java.io.File;
import java.io.IOException;


public class example_Test {
    Playwright playwright;
    public static Page page = null;
    public static AxePlaywrightBuilder axePlaywrightBuilder = null;
    static String reporter = new File(
            "src/test/resources/reporter-cli-macos")
            .getAbsolutePath();
    static String Logger = new File("axe-reports/").getAbsolutePath();

    static String Destination = "a11y-results/";
    static String command_html = reporter +" "+ Logger+" --destination "+Destination+" --format html";
    static String command_csv = reporter +" "+ Logger+" --destination "+Destination+" --format csv";
    static String command_xml = reporter +" "+ Logger+" --destination "+Destination+" --format xml";

    @BeforeClass
    public static void delete_json_dir() throws IOException {
        File file = new File(Logger);
        if (file.exists()){
            FileUtils.deleteDirectory(file);
        }
    }


    @Before
    public void initiate_drivers(){
        playwright = Playwright.create();
        Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false).setSlowMo(50));
        page = browser.newPage();
        axePlaywrightBuilder = new AxePlaywrightBuilder(page);
    }

    @Test
    public void test1(){
        page.navigate("https://broken-workshop.dequelabs.com/");
        AxeResults axeResults = axePlaywrightBuilder.analyze();
    }

    @Test
    public void test2(){
        page.navigate("https://broken-workshop.dequelabs.com/");
        page.locator("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button").click();
        AxeResults axeResults2 = axePlaywrightBuilder.analyze();
    }

    @After
    public void rename_json_reports(){
        File[] listOfFiles = new File("axe-reports/").listFiles();
        int ctr=1;
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].getName().contains("json")) {
                System.out.println("File " + listOfFiles[i].getName());
                File newname = new File ("axe-reports/axe-json-report"+ctr+".json");
                ctr++;
                listOfFiles[i].renameTo(newname);
            }
            if (listOfFiles[i].getName().contains("log")){
                File newname = new File ("axe-reports/axe-run-log"+ctr+".log");
                ctr++;
                listOfFiles[i].renameTo(newname);
            }
        }
    }

    @AfterClass
    public static void reporting() throws IOException {
        Runtime rt = Runtime.getRuntime();
        rt.exec(command_html);
        rt.exec(command_xml);
        rt.exec(command_csv);
    }
}

