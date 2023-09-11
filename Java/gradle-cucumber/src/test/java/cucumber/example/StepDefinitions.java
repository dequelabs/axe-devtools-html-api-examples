package cucumber.example;

import com.deque.html.axedevtools.cucumber.AxeWorld;
import com.deque.html.axedevtools.selenium.AxeDriver;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.When;
import io.cucumber.spring.CucumberContextConfiguration;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.test.context.ContextConfiguration;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.IOException;

@CucumberContextConfiguration
@ContextConfiguration(classes= AppConfiguration.class)
public class StepDefinitions {

    private AxeWorld axeWorld;

    public StepDefinitions(AxeWorld axeWorld) {
        this.axeWorld = axeWorld;
    }

    private WebDriver webDriver;

    @Before
    public void setup() throws IOException {
        WebDriverManager.chromedriver().setup();
        webDriver = new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*"));
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