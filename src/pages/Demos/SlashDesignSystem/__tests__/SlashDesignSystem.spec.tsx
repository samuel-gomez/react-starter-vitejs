import { configure, screen } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_MAIN } from 'shared/testsUtils/constants';
import { render } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil, UnTitreEstVisible } from 'shared/testsUtils/sharedScenarios';

import SlashDesignSystem from '../SlashDesignSystem';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/SlashDesignSystem/SlashDesignSystem.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<SlashDesignSystem />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
  };

  test('Affichage de la page SlashDesignSystem', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page SlashDesignSystem", renderPage);
    UnTitreEstVisible(then, 2, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
    UnTitreEstVisible(and, 3, SCOPE_MAIN);
  });
});
