import { defineFeature, loadFeature } from 'jest-cucumber';
import { screen, configure } from '@testing-library/react';
import { render } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil, UnTexteEstVisible, UnTitreEstVisible } from 'shared/testsUtils/sharedScenarios';
import ProtectedPage from '../ProtectedPage';

configure({ defaultHidden: true });

const feature = loadFeature('features/ProtectedPage/ProtectedPage.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<ProtectedPage />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
  };

  test('Affichage de la page privée', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page privée", renderPage);
    UnTitreEstVisible(then);
    UnTexteEstVisible(and);
  });
});
