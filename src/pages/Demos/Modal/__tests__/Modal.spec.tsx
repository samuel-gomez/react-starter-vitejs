import { defineFeature, loadFeature } from 'jest-cucumber';
import { configure, render, screen } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnLienEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';

import ModalPage from '../Modal';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/Modal/Modal.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<ModalPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground Modal', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo Modal', renderPage);
    UnTitreEstVisible(then, 2);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
  });
});
