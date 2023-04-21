package axeFunctions;

import java.io.File;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import com.deque.html.axecore.results.Results;
import com.deque.html.axedevtools.selenium.*;
import com.deque.html.axedevtools.selenium.reporter.*;

public class Functions {
	
	public static AxeReportingOptions _reportOptions = new AxeReportingOptions();
	public static AxeSelenium axeSelenium = new AxeSelenium(); 
    
	public void axeScan(String url) {
    	System.setProperty("webdriver.http.factory", "jdk-http-client");
		WebDriver webDriver = new ChromeDriver();
		AxeDriver axeDriver = new AxeDriver(webDriver);

		webDriver.get(url);
		AxeConfiguration.configure().testSuiteName("Test").outputDirectory("axe-json-reports/");
		Results homePageScanResults = axeSelenium.logResults(_reportOptions.uiState("Homepage_scan")).run(axeDriver);
		webDriver.findElement(By.cssSelector("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button")).click();
		Results recipeCardScanResults = axeSelenium.logResults(_reportOptions.uiState("Recipe_card_scan")).run(axeDriver);
		webDriver.quit();
	}
	
	public void generateReports() {
		Runtime runTime = Runtime.getRuntime();
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
	      runTime.exec(command_html);
	      runTime.exec(command_csv);
	      runTime.exec(command_xml);
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	}
}