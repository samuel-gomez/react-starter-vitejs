Feature: NavBar
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant NavBar

  @RG1
  Scenario: Affichage du playground NavBar
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo NavBar
    Then un titre "NavBar playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/molecules/navigation/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/layout-header-navbar--navbarbase"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/Layout/header"
    And un lien "Home" est visible avec un href "/"
    And un lien "Example Link" est visible avec un href "/layout"
