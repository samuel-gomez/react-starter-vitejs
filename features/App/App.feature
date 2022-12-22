@feature
Feature: Simple Counter Button

  Scenario: Render App
    Given I render my app
    Then I see : "Vite + React"

  Scenario: Render App and click counter
    Given I render my app
    When I click on button: "count is 0"
    Then I see : "count is 1"