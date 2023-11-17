Feature: Page privée
  En tant que profil autorisé, je souhaite pouvoir afficher la page privée

  @RG1
  Scenario Outline: Affichage de la page privée
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page privée
    Then un titre "Bienvenue dans l'espace privé" est visible
    And un texte "Exemple de page accessible par authentification" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |
