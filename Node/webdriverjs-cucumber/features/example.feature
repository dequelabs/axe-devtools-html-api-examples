Feature: Testing the dequelabs workshop homepage for a11y issues

    Scenario: Visit a11y homepage and check for accessibility issues
        Given I visit a11y test website homepage
        Then the page should be audited for accessibility


    Scenario: Visit a11y homepage and test the recipe card
        Given I visit a11y test website homepage
        When I click on the cook chocolate cake button
        Then the page should be audited for accessibility