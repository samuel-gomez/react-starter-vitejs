import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_EDITOR, SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import { configure, render, screen } from 'shared/testsUtils/customRender';
import {
  JeCliqueSurLaCheckbox,
  JeCliqueSurLeBouton,
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnBoutonHelpEstMasque,
  UnBoutonHelpEstVisible,
  UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne,
  UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne,
  UnEditeurEstVisible,
  UnLabelEstVisible,
  UnLienEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';

import SelectInputPage from '../SelectInput';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/SelectInput/SelectInput.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<SelectInputPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground SelectInput', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du SelectInput', renderPage);
    UnTitreEstVisible(then, 2);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnLabelEstVisible(and, SCOPE_PREVIEW);
  });

  test('Affichage/masquage du helpButton', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du SelectInput', renderPage);
    UnBoutonHelpEstMasque(then, SCOPE_PREVIEW);
    JeCliqueSurLeBouton(when);
    UnEditeurEstVisible(then);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(and);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurSelectionne(then);
    UnBoutonHelpEstVisible(and, SCOPE_PREVIEW);
    JeCliqueSurLaCheckbox(when, SCOPE_EDITOR);
    UnChampCheckboxToggleAvecUnLabelEtUneValeurNonSelectionne(then);
    UnBoutonHelpEstMasque(and, SCOPE_PREVIEW);
  });
});
