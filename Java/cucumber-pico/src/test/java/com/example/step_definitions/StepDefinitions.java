package com.example.step_definitions;

import com.deque.html.axedevtools.selenium.AxeDriver;
import com.deque.html.axedevtools.cucumber.AxeWorld;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.IOException;

public class StepDefinitions {

    private AxeWorld axeWorld;

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

    @When("^I visit \"([^\"]*)\"$")
    public void iVisit(String url) throws Throwable {
        webDriver.get(url);

    }
}
