Feature: As a user, I want to see autocomplete results in search field. 

Scenario: I navigate the page and see autocomplete field

Given I am on the home page of abc tech
When I select the search field
When I type some search items
Then I should see auto complete dropdown
Then the page should be audited for accessibility