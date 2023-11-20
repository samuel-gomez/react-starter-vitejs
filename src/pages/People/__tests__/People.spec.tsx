import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen, configure } from 'shared/testsUtils/customRender';
import { serverUseGet } from 'shared/testsUtils/msw';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  LaPageContientUnTableau,
  LeTableauContientLesLignesCorrespondantAuxDonneesRecues,
  LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';

import People from '..';
import type { TPeopleData } from '../People';

const feature = loadFeature('features/People/People.feature');

configure({ defaultHidden: true });

defineFeature(feature, test => {
  let role: string;
  const tableAriaLabel = 'Tableau des gens';

  test('Affichage de la page People', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });
    and('la page reçoit les données suivantes', responseBody => {
      serverUseGet<TPeopleData[]>({ route: 'people', responseBody });
    });
    when("J'accède à la page People", async () => {
      render(<People />, {}, { role });
      expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
    });
    UnTitreEstVisible(then);
    LaPageContientUnTableau(and, 'la page contient un tableau répertoriant la liste des gens', tableAriaLabel);
    LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant(
      and,
      /^le tableau présente des entêtes de colonnes dans l’ordre suivant : "(.*)", "(.*)", "(.*)", "(.*)"$/,
      tableAriaLabel,
    );
    LeTableauContientLesLignesCorrespondantAuxDonneesRecues(
      and,
      /^le tableau contient (\d+) lignes avec (\d+) colonnes dans l'ordre suivant :$/,
      tableAriaLabel,
    );
  });
});
