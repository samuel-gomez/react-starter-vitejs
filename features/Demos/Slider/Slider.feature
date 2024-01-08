Feature: Playground Slider
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Slider

  @RG1
  Scenario: Affichage du playground Slider
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Slider
    Then un titre "Slider playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/atoms/slider/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/form-input-slider--slider"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/Form/Input/slider"
    And un bouton "Edit props" est visible
    And un texte "My Label Slider" est visible
