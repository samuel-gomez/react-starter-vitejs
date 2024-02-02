import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import { configure, render, screen } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil, UnLienEstVisible, UnTitreEstVisible } from 'shared/testsUtils/sharedScenarios';

import NavBarPage from '../NavBar';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/NavBar/NavBar.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<NavBarPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground NavBar', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo NavBar', renderPage);
    UnTitreEstVisible(then, 2);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and, 'menuitem', SCOPE_PREVIEW);
    UnLienEstVisible(and, 'menuitem', SCOPE_PREVIEW);
  });
});
