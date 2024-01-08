Feature: Playground Loader
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Loader

  @RG1
  Scenario: Affichage du playground Loader
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Loader
    Then un titre "Loader playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/atoms/loader/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/loader--default"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/loader"
    And un bouton "Edit props" est visible
    And un texte "Chargement en cours" est visible
