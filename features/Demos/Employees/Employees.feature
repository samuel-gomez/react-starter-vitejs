Feature: Consultation des collaborateurs

  @RG1
  Scenario: Affichage de la liste des collaborateurs
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J'accède à la page des collaborateurs
    Then la page contient un tableau répertoriant la liste des collaborateurs
    And le tableau présente des entêtes de colonnes dans l’ordre suivant : "", "Collaborateur 1", "Collaborateur 2"
    And le tableau contient 3 lignes avec 3 colonnes dans l'ordre suivant :
      |          | employee1            | employee2             |
      | Contact  | James Philips        | Marie Beauchamp       |
      | Position | Directeur des ventes | Manager des ventes    |
      | Email    | jp@1ltd.example.com  | marie@2co.example.com |
