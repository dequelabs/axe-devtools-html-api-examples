Feature: Testing the dequelabs workshop homepage for a11y issues

  Scenario: Visit a11y homepage and check for accessibility issues
    When I visit a11y test website homepage
    Then the page should be audited for accessibility


  Scenario: Visit a11y homepage and test the recipe card
    When I visit a11y test website homepage
    And click on the cook chocolate cake button
    Then the page should be audited for accessibility



