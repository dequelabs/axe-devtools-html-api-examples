using Deque.AxeDevtools.Selenium;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using System;


// C# Axe example using Selenium

namespace AxeTest {
    public class Example {
        public static void Main() {
            IWebDriver driver = new ChromeDriver();
            driver.Navigate().GoToUrl("https://broken-workshop.dequelabs.com/");

            AxeSelenium axe = new AxeSelenium(driver);

            var results = axe.Analyze();
            AxeReporting.CreateResultsOutput(results, "hompage-no-flow");
            Console.WriteLine("Found " + results.Findings.Violations.Count + " violations!");
            
            // Create a new axe driver to avoid re-injection of scripts
            axe = new AxeSelenium(driver);
            
            driver.FindElement(By.CssSelector("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button")).Click();
            var alteredResults = axe.Analyze();
            AxeReporting.CreateResultsOutput(alteredResults, "altered-homepage");
            Console.WriteLine("Found " + alteredResults.Findings.Violations.Count + " violations!");

            driver.Quit();
        }
    }
}