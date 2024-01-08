Feature: Playground Infos
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Infos

  @RG1
  Scenario: Affichage du playground Infos
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Infos
    Then un titre "Infos playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/organisms/header/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/layout-header-infos--default"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/Layout/header/src/Infos"
    And un bouton "Edit props" est visible
    And un texte "Portefeuille" est visible
