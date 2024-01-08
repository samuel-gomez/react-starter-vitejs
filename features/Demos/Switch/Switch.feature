Feature: Playground Switch
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant Switch

  @RG1
  Scenario: Affichage du playground Switch
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du Switch
    Then un titre "Switch playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/molecules/form-radio-switch/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/form-input-switch--switch"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/Form/Input/switch"
    And un bouton "Edit props" est visible
    And un label "Select a choice" est visible


