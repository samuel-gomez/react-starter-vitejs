import { type DefineStepFunction } from 'jest-cucumber';

const JeSuisUnUtilisateurConnuEtConnecteAvecleProfil = (instruction: DefineStepFunction, callback: (arg: string) => void) =>
  instruction(/^Je suis un utilisateur connu et connecté avec le profil "(.*)"$/, role => {
    callback(role);
  });

export default JeSuisUnUtilisateurConnuEtConnecteAvecleProfil;
