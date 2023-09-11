package cucumber.example;

import io.cucumber.junit.CucumberOptions;
import io.cucumber.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    glue = {"cucumber.example", "com.deque.html.axedevtools.cucumber"},
    features = {"src/test/resources"})
public class ExampleTest {}
