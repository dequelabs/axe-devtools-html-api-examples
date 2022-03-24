package com.example;

import io.cucumber.junit.CucumberOptions;
import io.cucumber.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        glue = {"com.example.step_definitions", "com.deque.html.axedevtools.cucumber"},
        features = {"src/test/resources"}
)
public class RunCukesTest {
}
