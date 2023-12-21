import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from 'shared/testsUtils/customRender';
import { serverUseGet } from 'shared/testsUtils/msw';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  LaPageContientUnTableau,
  LeTableauContientLesLignesCorrespondantAuxDonneesRecues,
  LeTableauPresenteDesEntetesDeTriDeColonnesDansLOrdreSuivant,
} from 'shared/testsUtils/sharedScenarios';
import Members from '..';
import type { TresponseBody } from '../Members.hook';
import { totals } from './Members.mock';

const feature = loadFeature('features/Demos/Members/Members.feature');
const tableItemsType = 'membres';

defineFeature(feature, test => {
  let role: string;

  test('Affichage de la liste des membres', ({ given, and, when, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    and('la page reçoit les membres suivants', data => {
      serverUseGet<TresponseBody>({ route: 'members', responseBody: { totals, data } });
    });

    when("J'accède à la page des membres", async () => {
      render(<Members />, {}, { role });
      expect(await screen.findByText('Samuel')).toBeInTheDocument();
    });

    LaPageContientUnTableau(then, 'la page contient un tableau répertoriant la liste des membres', tableItemsType);

    LeTableauPresenteDesEntetesDeTriDeColonnesDansLOrdreSuivant(
      and,
      /^le tableau présente des entêtes de tri de colonnes dans l’ordre suivant : "(.*)", "(.*)", "(.*)", "(.*)"$/,
      tableItemsType,
    );

    LeTableauContientLesLignesCorrespondantAuxDonneesRecues(
      and,
      /^le tableau contient (\d+) lignes avec (\d+) colonnes dans l'ordre suivant :$/,
      tableItemsType,
    );
  });
});
