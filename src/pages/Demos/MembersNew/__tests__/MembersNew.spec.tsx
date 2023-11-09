import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnChampTextEstVisible,
  UnChampListeDeroulanteEstVisible,
  UnTitreEstVisible,
  UnBoutonEstVisible,
  JeSelectionneUneValeurSurleChamp,
  JeSaisieDansLeChamp,
  JeCliqueSurLeBouton,
  UnChampTextEstVisibleAvecLaValeur,
  UneAlertSuccessContenantLeMessage,
  UnTexteEstVisible,
  UneAlertErrorContenantLeMessage,
} from 'shared/testsUtils/sharedScenarios';
import { serverUsePost } from 'shared/testsUtils/msw';
import MembersNew from '..';

const feature = loadFeature('features/Demos/MembersNew/MembersNew.feature');

defineFeature(feature, test => {
  let role: string;

  test("Validation du formulaire d'ajout de membre en erreur", ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    and("J'accède à la page ajout de membre", async () => {
      render(<MembersNew />, {}, { role });
      expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    });

    UnTitreEstVisible(and);
    UnTitreEstVisible(and);
    UnChampListeDeroulanteEstVisible(and);
    UnChampTextEstVisible(and);
    UnChampTextEstVisible(and);
    UnBoutonEstVisible(and);
    UnBoutonEstVisible(and);
    JeCliqueSurLeBouton(when);
    UnTexteEstVisible(then);
    UnTexteEstVisible(and);
    UnTexteEstVisible(and);
  });

  test("Saisie valide du formulaire d'ajout de membre", ({ given, when, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    when("J'accède à la page ajout de membre", async () => {
      render(<MembersNew />, {}, { role });
      expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    });

    JeSelectionneUneValeurSurleChamp(and);
    JeSaisieDansLeChamp(and);
    UnChampTextEstVisibleAvecLaValeur(and);
    JeSaisieDansLeChamp(and);
    JeCliqueSurLeBouton(and);
    UnChampTextEstVisibleAvecLaValeur(and);
    UneAlertSuccessContenantLeMessage(and);
  });

  test('Erreur serveur (500)', ({ given, when, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
      serverUsePost({ route: 'members/add', code: 500 });
    });

    when("J'accède à la page ajout de membre", async () => {
      render(<MembersNew />, {}, { role });
      expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    });

    JeSelectionneUneValeurSurleChamp(and);
    JeSaisieDansLeChamp(and);
    UnChampTextEstVisibleAvecLaValeur(and);
    JeSaisieDansLeChamp(and);
    JeCliqueSurLeBouton(and);
    UnChampTextEstVisibleAvecLaValeur(and);
    UneAlertErrorContenantLeMessage(and);
  });
});
