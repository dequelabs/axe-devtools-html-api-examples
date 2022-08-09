Feature: Login feature

  Scenario: Check homepage for a11y issues
    When I navigate to "https://broken-workshop.dequelabs.com/"
    Then the page should be audited for accessibility logging results for: homepage

  Scenario: Check recipe card on homepage for a11y issues
    When I navigate to "https://broken-workshop.dequelabs.com/"
    Then click on the recipar card button
    Then the page should be audited for accessibility logging results for: recipe_card
