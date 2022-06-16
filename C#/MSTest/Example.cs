using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Remote;
using ReportResults = Deque.AxeDevtools.Results.ReportResults;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using Deque.AxeDevtools.Selenium;
using System;
using RunTagType = Deque.AxeDevtools.RunOptions.TagType;


// C# Axe example using Selenium and MSTest to run tests

namespace AxeTest {
    [TestClass]
    public class Example {
        static RemoteWebDriver driver;
        static AxeSelenium axe;

        [ClassInitialize]
        public static void AssemblyInit(TestContext context) {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("https://broken-workshop.dequelabs.com/");
            axe = new AxeSelenium(driver);
        }

        [ClassCleanup]
        public static void TearDown() {
            driver.Quit();
        }

        [TestMethod]
        public void HompageNoFlow() {
            var results = axe.Analyze();
            Assert.AreEqual(0, results.Findings.Violations.Count);
        }

        [TestMethod]
        public void AlteredHompage() {
            driver.FindElement(By.CssSelector("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button")).Click();
            var results2 = axe.Analyze();
            Assert.AreEqual(0, results2.Findings.Violations.Count);
        }
    }
}