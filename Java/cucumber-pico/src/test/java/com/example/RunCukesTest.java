package com.example;

import io.cucumber.junit.CucumberOptions;
import io.cucumber.junit.Cucumber;
import org.junit.runner.RunWith;
import com.deque.html.axedevtools.cucumber.StepDefinitions;

@RunWith(Cucumber.class)
@CucumberOptions(
        glue = {"com.deque.html.axedevtools.cucumber", "com.example.step_definitions"},
        features = {"src/test/resources"}
)
public class RunCukesTest {
}
