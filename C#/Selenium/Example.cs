using Deque.AxeDevtools.Selenium;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using System;
using ReportResults = Deque.AxeDevtools.Results.ReportResults;


// C# Axe example using Selenium

RemoteWebDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl("https://broken-workshop.dequelabs.com/");

AxeSelenium axe = new AxeSelenium(driver);

var results = axe.Analyze();
Console.WriteLine("Found " + results.Findings.Violations.Count + " violations!");

driver.FindElement(By.CssSelector("#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button")).Click();
var results2 = axe.Analyze();
Console.WriteLine("Found " + results2.Findings.Violations.Count + " violations!");

driver.Quit();