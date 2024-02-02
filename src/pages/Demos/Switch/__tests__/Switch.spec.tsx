import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import { configure, render, screen, waitFor, within } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnLienEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';

import SwitchPage from '../Switch';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/Switch/Switch.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<SwitchPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground Switch', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Switch', renderPage);
    UnTitreEstVisible(then, 2);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    and(/^un label "(.*)" est visible$/, async name => {
      const preview = within(screen.getByLabelText(SCOPE_PREVIEW));
      await waitFor(() => expect(preview.getByText(RegExp(name))).toBeInTheDocument());
    });
  });
});
