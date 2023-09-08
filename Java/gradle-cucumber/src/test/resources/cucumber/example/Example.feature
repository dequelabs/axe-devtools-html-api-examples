Feature: Examples of Accessibility Testing

  Scenario: Test Page For Accessibility
    When I visit "http://abcdcomputech.dequecloud.com/"
    Then the page should not be axe clean

  Scenario: Audit Page for Accessibility
    When I visit "http://abcdcomputech.dequecloud.com/"
    Then the page should be audited for accessibility