import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_EDITOR, SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import { render, screen } from 'shared/testsUtils/customRender';
import {
  JeCliqueSurLaCheckbox,
  JeCliqueSurLeBouton,
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnBoutonSansLabelEstMasque,
  UnBoutonSansLabelEstVisible,
  UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne,
  UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne,
  UnEditeurEstVisible,
  UnLienEstVisible,
  UnTexteEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';

import AlertPage from '../Alert';

const feature = loadFeature('features/Demos/Alert/Alert.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<AlertPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground Alert', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Alert', renderPage);
    UnTitreEstVisible(then, 2);
    UnBoutonSansLabelEstVisible(and, /^un bouton de fermeture est visible$/, SCOPE_PREVIEW);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnTexteEstVisible(and, SCOPE_PREVIEW);
  });

  test('Affichage/masquage du closeButton', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Alert', renderPage);
    UnBoutonSansLabelEstVisible(and, /^un bouton de fermeture est visible$/, SCOPE_PREVIEW);
    JeCliqueSurLeBouton(when);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnBoutonSansLabelEstMasque(and, /^un bouton de fermeture est masqué$/, SCOPE_PREVIEW);
  });
});
