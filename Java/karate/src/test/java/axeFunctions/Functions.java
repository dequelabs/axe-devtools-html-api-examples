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
	public static WebDriver webDriver = new ChromeDriver();
	public static AxeDriver axeDriver = new AxeDriver(webDriver);
    
	public void axeScan(String url) {
		webDriver.get(url);
		AxeConfiguration.configure().testSuiteName("Test").outputDirectory("axe-json-reports/");
		Results results1 = axeSelenium.logResults(_reportOptions.uiState("Homepage_scan")).run(axeDriver);
		webDriver.findElement(By.cssSelector("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button")).click();
		Results results2 = axeSelenium.logResults(_reportOptions.uiState("Recipe_card_scan")).run(axeDriver);
		webDriver.quit();
	}
	
	public void generateReports() {
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