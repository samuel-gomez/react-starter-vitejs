Feature: Playground Footer
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Footer

  @RG1
  Scenario: Affichage du playground Footer
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Footer
    Then un titre "Footer playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/molecules/footer/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/layout-footer--footer-story"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/Layout/footer"
    And un bouton "Edit props" est visible
    And un texte "© 2022-2023 AXA Webcenter" est visible
