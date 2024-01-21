import { defineFeature, loadFeature } from 'jest-cucumber';
import { configure, render, screen } from 'shared/testsUtils/customRender';
import { serverUseGet } from 'shared/testsUtils/msw';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  LaPageContientUnTableau,
  LeTableauContientLesLignesCorrespondantAuxDonneesRecues,
  LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';
import People from '..';
import { type TPeopleData } from '../People';

configure({ defaultHidden: true });

const feature = loadFeature('features/People/People.feature');

defineFeature(feature, test => {
  let role: string;
  const tableItemsType = 'membres';
  test('Affichage de la page People', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });
    and('la page reçoit les données suivantes', responseBody => {
      serverUseGet<TPeopleData[]>({ route: 'people', responseBody }); // le typage TPeopleData sera fait juste après
    });
    when("J'accède à la page People", async () => {
      render(<People />, {}, { role });
      expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
    });
    UnTitreEstVisible(then, 2);
    LaPageContientUnTableau(and, 'la page contient un tableau répertoriant la liste des gens', tableItemsType);
    LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant(
      and,
      /^le tableau présente des entêtes de colonnes dans l’ordre suivant : "(.*)", "(.*)", "(.*)", "(.*)"$/,
      tableItemsType,
    );
    LeTableauContientLesLignesCorrespondantAuxDonneesRecues(
      and,
      /^le tableau contient (\d+) lignes avec (\d+) colonnes dans l'ordre suivant :$/,
      tableItemsType,
    );
  });
});
