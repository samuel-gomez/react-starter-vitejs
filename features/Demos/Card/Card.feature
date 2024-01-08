Feature: Playground Card
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Card

  @RG1
  Scenario: Affichage du playground Card
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo Card
    Then un titre "Card playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/organisms/form-card/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/form-elements-card--card-checkbox-one-story"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/Form/Input/card"
    And un bouton "Edit props" est visible
    And un texte "Franchisés standard" est visible

  @RG2
  Scenario: Changement de type de Card
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo Card
    Then un titre "Card playground" est visible
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    And Je sélectionne la valeur "Radio" sur le champ "type"
