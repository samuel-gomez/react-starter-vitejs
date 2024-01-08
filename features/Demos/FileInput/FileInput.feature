Feature: Playground FileInput
  En tant que profil autorisé, je souhaite pouvoir visualiser la démo du composant FileInput

  @RG1
  Scenario: Affichage du playground FileInput
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J’accède à la page démo du FileInput
    Then un titre "FileInput playground" est visible
    And un lien "Guidelines" est visible avec un href "https://axafrance.github.io/design-system/molecules/form-file/"
    And un lien "Storybook" est visible avec un href "https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/form-input-file--file"
    And un lien "Github" est visible avec un href "https://github.com/AxaGuilDEv/react-toolkit/tree/v2.2.0/packages/Form/Input/file"
    And un bouton "Edit props" est visible
    And un texte "My Label File" est visible
