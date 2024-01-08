Feature: Modal
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Modal

  @RG1
  Scenario: Affichage du playground Modal
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo Modal
    Then un titre "Modal playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/organisms/modal/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/modal-default--custom-header-story"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/Modal/default"
    And un bouton "Click me to launch modal" est visible
