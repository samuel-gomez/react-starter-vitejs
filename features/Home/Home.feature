@feature
Feature: Simple Counter Button

  Scenario: Render Home
    Given I render my home
    Then I see : "Vite + React"

  Scenario: Render Home and click counter
    Given I render my home
    When I click on button: "count is 0"
    Then I see : "count is 1"