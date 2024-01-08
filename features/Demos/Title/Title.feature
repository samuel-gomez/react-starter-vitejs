Feature: Playground Title
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Title

  @RG1
  Scenario: Affichage du playground Title
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Title
    Then un titre "Title playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/atoms/title/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/title--default"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/title"
    And un bouton "Edit props" est visible
    And un titre "My title" est visible

