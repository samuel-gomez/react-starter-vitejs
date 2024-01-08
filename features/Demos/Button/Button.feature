Feature: Playground Button
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Button

  @RG1
  Scenario: Affichage du playground Button
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Button
    Then un titre "Button playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/atoms/button/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/button--simple-button"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/button"
    And un bouton "Edit props" est visible
    And un bouton "valider" est visible


  @RG2
  Scenario: Sélection d'un icone
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Button
    And je clique sur le bouton "Edit props"
    Then un éditeur de propriété est visible
    When Je sélectionne la valeur "close" sur le champ "icon"
    Then un icone "close" est visible
