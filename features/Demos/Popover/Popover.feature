Feature: Playground Popover
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Popover

  @RG1
  Scenario: Affichage du playground Popover
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Popover
    Then un titre "Popover playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/atoms/popover/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/popover-popover--default"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/popover"
    And un bouton "Edit props" est visible
    And un texte "Exemple Popover" est visible

