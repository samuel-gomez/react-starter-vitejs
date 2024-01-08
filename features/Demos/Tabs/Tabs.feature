Feature: Playground Tabs
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Tabs

  @RG1
  Scenario: Affichage du playground Tabs
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Tabs
    Then un titre "Tabs playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/molecules/tabs/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/tabs--default"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/tabs"
    And un bouton "Edit props" est visible
    And un texte "Content second tab" est visible
