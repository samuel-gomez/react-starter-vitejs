import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import { configure, render, screen } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnLienEstVisible,
  UnTexteEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';
import CardPage from '../Card';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/Card/Card.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<CardPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground Card', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo Card', renderPage);
    UnTitreEstVisible(then);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnTexteEstVisible(and, SCOPE_PREVIEW);
  });
});
