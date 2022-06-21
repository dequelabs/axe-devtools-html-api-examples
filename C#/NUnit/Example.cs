using NUnit.Framework;
using Deque.AxeDevtools.Selenium;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;

// C# Axe example using Selenium and NUnit to run tests

namespace AxeTest {
    public class Example {
        IWebDriver driver;
        AxeSelenium axe;

        [SetUp]
        public void Setup() {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("https://broken-workshop.dequelabs.com/");
            axe = new AxeSelenium(driver);
        }

        [TearDown]
        public void TearDown() {
            driver.Quit();
        }

        [Test]
        public void HompageNoFlow() {
            var results = axe.Analyze();
            AxeReporting.CreateResultsOutput(results, "homepage-no-flow");
            Assert.That(results.Findings.Violations.Count, Is.EqualTo(0));
        }

        [Test]
        public void AlteredHompage() {
            driver.FindElement(By.CssSelector("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button")).Click();
            var alteredResults = axe.Analyze();
            AxeReporting.CreateResultsOutput(alteredResults, "altered-homepage");
            Assert.That(alteredResults.Findings.Violations.Count, Is.EqualTo(0));
        }
    }
}