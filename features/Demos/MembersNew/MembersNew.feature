Feature: Ajout de membres

  @RG1
  Scenario Outline: Validation du formulaire d'ajout de membre en erreur
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    And J'accède à la page ajout de membre
    And un titre "Création d'un membre" est visible
    And un titre "Ajouter un membre" est visible
    And Un champ liste déroulante "Civilité" est visible
    And un champ texte "Prénom" est visible
    And un champ texte "Nom" est visible
    And un bouton "Annuler" est visible
    And un bouton "Valider" est visible
    When je clique sur le bouton "Valider"
    Then un texte "Le champ Civilité est obligatoire" est visible
    And un texte "Le champ Prénom est obligatoire" est visible
    And un texte "Le champ Nom est obligatoire" est visible

    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG2
  Scenario Outline: Saisie valide du formulaire d'ajout de membre
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page ajout de membre
    And Je sélectionne la valeur "Mme" sur le champ "Civilité"
    And je saisie "Samuel" dans le champ "Prénom"
    And un champ texte "Prénom" est visible avec la valeur "Samuel"
    And je saisie "Gomez" dans le champ "Nom"
    And je clique sur le bouton "Valider"
    And un champ texte "Prénom" est visible avec la valeur ""
    And une alerte de type success contenant le message : "Membre Samuel Gomez ajouté avec succès"
    Examples:
      | profil |
      | Admin  |
      | User   |

  @RG3
  Scenario Outline: Erreur serveur (500)
    Given Je suis un utilisateur connu et connecté avec le profil "<profil>"
    When J'accède à la page ajout de membre
    And Je sélectionne la valeur "Mme" sur le champ "Civilité"
    And je saisie "500" dans le champ "Prénom"
    And un champ texte "Prénom" est visible avec la valeur "500"
    And je saisie "500" dans le champ "Nom"
    And je clique sur le bouton "Valider"
    And un champ texte "Prénom" est visible avec la valeur "500"
    And une alerte de type error contenant le message : "Erreur: Problème technique ! Contacter votre support"
    Examples:
      | profil |
      | Admin  |
      | User   |