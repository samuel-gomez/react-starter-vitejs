import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import { render, screen } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnLienEstVisible,
  UnTexteEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';

import TablePage from '../Table';

const feature = loadFeature('features/Demos/Table/Table.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<TablePage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground Table', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Table', renderPage);
    UnTitreEstVisible(then, 2);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnTexteEstVisible(and, SCOPE_PREVIEW);
  });
});
