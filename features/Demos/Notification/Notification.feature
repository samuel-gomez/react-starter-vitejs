Feature: Notification
  En tant que profil autorisé, je souhaite pouvoir visualiser la Notification

  @RG1
  Scenario: Affichage de la démo Notification
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo Notification
    Then un titre "Examples Notifications" est visible
    And un titre "Hook example" est visible
    And un titre "Error notification" est visible
    And un titre "Success notification" est visible
    And un titre "Warning notification" est visible
