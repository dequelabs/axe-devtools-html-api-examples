package com.example.pageobjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import com.example.pageobjects.PageObject;

public class AbcTech extends PageObject {
	@FindBy(xpath="//input[@name=\"q\"]")
	private WebElement searchBar;
	
	@FindBy(xpath="//*[@id=\"go\"]")
	private WebElement searchButton;
	
	public  AbcTech (WebDriver driver) {
		super(driver);
	}
	
	public void clickSearch() {
		searchBar.click();
	}
	public void typeSearchText() {
		searchBar.sendKeys("csun");
	}
	
}