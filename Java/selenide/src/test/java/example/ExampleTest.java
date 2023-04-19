package example;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;

import com.codeborne.selenide.WebDriverRunner;
import com.deque.html.axecore.results.Results;
import com.deque.html.axedevtools.selenium.*;
import com.deque.html.axedevtools.selenium.reporter.*;

import java.io.File;
import java.io.IOException;

import static com.codeborne.selenide.Selenide.*;

public class ExampleTest {

	private static AxeDriver axedriver = null;
	private static AxeSelenium axeSelenium = null;
	private static AxeReportingOptions reportOptions = new AxeReportingOptions();
	

	@BeforeClass
	public void setUp() throws Exception {
		reportOptions = new AxeReportingOptions();
		axeSelenium = new AxeSelenium();
		AxeConfiguration.configure().testSuiteName("Test").outputDirectory("axe-json-reports/");
	}

	@Test
	public void test_a11y_workshop_homepage() {
		open("https://broken-workshop.dequelabs.com/");
		axedriver = new AxeDriver(WebDriverRunner.getWebDriver());
		Results results1 =
				axeSelenium.logResults(reportOptions.uiState("Homepage_scan")).run(axedriver);
	}
	
	@Test
	public void test_recipe_card_a11y_workshop_homepage() {
		open("https://broken-workshop.dequelabs.com/");
		$("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button").click();
		Results results2 =
				axeSelenium.logResults(reportOptions.uiState("Recipe_card_scan")).run(axedriver);
	}

	@AfterClass
	public static void reporting() throws IOException {
		Runtime rt = Runtime.getRuntime();
		String reporter = new File("src/test/resources/reporter-cli-macos").getAbsolutePath();
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
	}
}