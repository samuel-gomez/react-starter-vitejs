import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  LeTableauContientLesLignesCorrespondantAuxDonneesRecues,
  LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant,
  LaPageContientUnTableau,
} from 'shared/testsUtils/sharedScenarios';
import Members from '..';
import { totals } from './Members.mock';

const feature = loadFeature('features/Demos/Members/Members.feature');
const tableAriaLabel = 'Tableau Liste des membres';

defineFeature(feature, test => {
  let role: string;
  let members: Record<string, string>[];

  test('Affichage de la liste des membres', ({ given, and, when, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    and('la page reçoit les membres suivants', membersMock => {
      members = membersMock;
    });

    when("J'accède à la page des membres", async () => {
      render(<Members />, {}, { role, responseBody: { totals, data: members } });

      expect(await screen.findByText('Samuel')).toBeInTheDocument();
    });

    LaPageContientUnTableau(then, 'la page contient un tableau répertoriant la liste des membres', tableAriaLabel);

    LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant(and, `"Nom", "Prénom", "Date de naissance", "Sexe"`, undefined, tableAriaLabel);

    LeTableauContientLesLignesCorrespondantAuxDonneesRecues(
      and,
      "le tableau contient 4 lignes correspondant à un sociétaire avec 4 colonnes dans l'ordre suivant :",
      tableAriaLabel,
    );
  });
});
