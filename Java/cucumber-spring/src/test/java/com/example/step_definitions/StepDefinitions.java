package com.example.step_definitions;

import com.deque.html.axedevtools.selenium.AxeDriver;
import com.deque.html.axedevtools.cucumber.AxeWorld;
import com.example.AppConfiguration;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import java.util.concurrent.TimeUnit;
import io.cucumber.spring.CucumberContextConfiguration;
import com.example.pageobjects.AbcTech;
import static org.junit.Assert.assertTrue;

import java.io.IOException;


@CucumberContextConfiguration
@ContextConfiguration(classes= AppConfiguration.class)
public class StepDefinitions {

    private AxeWorld axeWorld;
    private AbcTech homePage;

    @Autowired
    public StepDefinitions(AxeWorld axeWorld) {
        this.axeWorld = axeWorld;
    }

    private WebDriver webDriver;

    @Before
    public void setup() throws IOException {
        webDriver = new ChromeDriver();
        axeWorld.setPage(new AxeDriver(webDriver));
    }

    @After
    public void tearDown() throws Exception {
        webDriver.quit();
    }

    @Given("^I am on the home page of abc tech$")
	public void i_am_on_mars_commuter_homepage() throws Throwable {
		 webDriver.get("http://abcdcomputech.dequecloud.com/");
		 homePage = new AbcTech(webDriver);	
	}

	@When("^I select the search field$")
	public void i_select_search_fields() throws Throwable {
		homePage.clickSearch();
	}

	@When("^I type some search items$")
	public void i_type_some_search_items() throws Throwable {
		homePage.typeSearchText();
	}

	@Then("^I should see auto complete dropdown$")
	public void i_see_some_auto_complete_dropdown() throws Throwable {
		webDriver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
		boolean present = webDriver.findElements(By.id("go")).size() != 0;
		assertTrue(present);
	}
}
