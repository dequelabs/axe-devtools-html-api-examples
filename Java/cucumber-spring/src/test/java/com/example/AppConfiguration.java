package com.example;

import com.deque.html.axedevtools.cucumber.AxeWorld;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = { "com.example" })
public class AppConfiguration {

    @Bean
    public static AxeWorld axeWorld() {
        return new AxeWorld();
    }
}
