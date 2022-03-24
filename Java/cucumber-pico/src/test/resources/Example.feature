Feature: Examples of Accessibility Testing

  Scenario: Test Page For Accessibility
    When I visit "http://abcdcomputech.dequecloud.com/"
    Then the page should not be axe clean

  Scenario: Audit Page for Accessibility
    When I visit "http://abcdcomputech.dequecloud.com/"
    Then the page should be audited for accessibility

  Scenario: Test Page with options
    When I visit "http://abcdcomputech.dequecloud.com/"
    Then the page should be audited for accessibility within "title" according to: wcag2a

  Scenario: Test Page with options
    When I visit "http://abcdcomputech.dequecloud.com/"
    Then the page should be audited for accessibility within "title" according to ruleset: wcag2.1

  Scenario: Test Page for color contrast only
    When I visit "http://abcdcomputech.dequecloud.com/"
    Then the page should be axe clean checking only: page-has-heading-one
