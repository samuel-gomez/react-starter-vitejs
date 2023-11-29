import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen, configure, act } from 'shared/testsUtils/customRender';
import { serverUseGet } from 'shared/testsUtils/msw';
import {
  JeCliqueSurLeBoutonIcone,
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  LaPageContientUnTableau,
  LeTableauContientLesLignesCorrespondantAuxDonneesRecues,
  LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant,
  UnTitreEstVisible,
  UneModaleApparaitAvecLeTitre,
} from 'shared/testsUtils/sharedScenarios';

import People from '..';
import type { TPeopleData } from '../People';
import type { TPeopleDetailData } from '../PeopleDetail/Details';

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
      /^le tableau présente des entêtes de colonnes dans l’ordre suivant : "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/,
      tableAriaLabel,
    );
    LeTableauContientLesLignesCorrespondantAuxDonneesRecues(
      and,
      /^le tableau contient (\d+) lignes avec (\d+) colonnes dans l'ordre suivant :$/,
      tableAriaLabel,
    );
  });

  test('Affichage du détail', ({ given, and, when, then }) => {
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

    and(/^la modal reçoit : "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/, async (clientId, contractNumber, date, agencyName, address, phone) => {
      serverUseGet<TPeopleDetailData>({
        route: `people/:id`,
        responseBody: { clientId, contractNumber, date, agencyName, address, phone },
      });
    });

    JeCliqueSurLeBoutonIcone(and);

    UneModaleApparaitAvecLeTitre(then);

    and(/^la modal affiche les données suivantes : "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/, (contractNumber, date, agencyName, address, phone) => {
      expect(screen.getByText(/Fermer/)).toBeInTheDocument();
      act(async () => {
        expect(await screen.findByText(contractNumber)).toBeInTheDocument();
        expect(await screen.findByText(date)).toBeInTheDocument();
        expect(await screen.findByText(agencyName)).toBeInTheDocument();
        expect(await screen.findByText(address)).toBeInTheDocument();
        expect(await screen.findByText(phone)).toBeInTheDocument();
      });
    });
  });
});
