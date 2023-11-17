Feature: Page d'accueil
  En tant que profil autorisé, je souhaite pouvoir afficher la page d'accueil

  @RG1
  Scenario: Affichage de la page d'accueil
    Given Je suis un utilisateur connu et connecté avec le profil "Admin"
    When J'accède à la page accueil
    Then un titre "Bienvenue sur la démo du starter Slash Design System" est visible
    And un titre "Technical Stack" est visible
    And un texte "Ce starter est principalement basé sur ces outils." est visible
    And un titre "Testing tools" est visible
    And un texte "Voici la liste des outils implémentés pour effectuer les tests unitaires et les tests d'intégration." est visible
    And un titre "Checking tools" est visible
    And un texte "Voici la liste des outils facilitant les développements." est visible
    And un titre "Accessibility tools" est visible
    And un texte "Voici la liste des outils facilitant la mise en oeuvre de l'accessibilité." est visible
    And un titre "Other tools" est visible
    And un texte "Voici la liste des outils complémentaires" est visible
    And la liste des packages est visible
      | titleItem       | linkItem                                             |
      | React           | https://fr.reactjs.org/                              |
      | Slash DS        | https://axafrance.github.io/design-system/           |
      | Vite            | https://vitejs.dev/                                  |
      | Testing Library | https://testing-library.com/                         |
      | Jest Cucumber   | https://github.com/bencompton/jest-cucumber          |
      | Vitest          | https://vitest.dev/                                  |
      | MSW             | https://mswjs.io/                                    |
      | Typescript      | https://www.typescriptlang.org/                      |
      | Eslint          | https://eslint.org/                                  |
      | Prettier        | https://prettier.io/                                 |
      | Husky           | https://typicode.github.io/husky/#/                  |
      | Commitlint      | https://commitlint.js.org/#/                         |
      | Axe Core        | https://www.deque.com/axe/                           |
      | Eslint A11y     | https://www.npmjs.com/package/eslint-plugin-jsx-a11y |
      | React router    | https://reactrouter.com/en/main                      |
      | React Hook Form | https://react-hook-form.com/                         |
      | React Query     | https://tanstack.com/query/v4                        |
      | SonarQube       | https://www.sonarqube.org/                           |
      | React OIDC      | https://github.com/AxaGuilDEv/react-oidc             |

