import packageJson from '../../package.json';

/** ***********************************************************************
 * FORM CONSTANTS
 ************************************************************************ */
export const MSG_REQUIRED = 'Le champ est obligatoire';

export const MSG_LENGTH_3 = 'Le champ doit faire au moins 3 caractères';
export const MSG_FORMAT = 'Format invalide';
export const MSG_ERROR_FORMAT = 'Format de fichier incorrect';

export const DEFAULT_OPTION_LABEL = '- Sélectionner -';
export const DEFAULT_OPTION = {
  value: '',
  label: DEFAULT_OPTION_LABEL,
};

// patterns
export const patternEmail = /^[\w-+]+@([\w-+]+\.)+[\w-]{2,}$/;
export const patternPhoneNumber = /^[+0][\d ]*$/;
export const patternZipCode = /^\d{5}$/;
export const patternSiret = /^\d{14}$/;
export const patternSiren = /^\d{9}$/;
export const patternSiretSiren = /^\d{9,14}$/;

export const phoneNumberRule = {
  required: true,
  minLength: 4,
  maxLength: 20,
  pattern: patternPhoneNumber,
};

export const emailRule = {
  required: true,
  minLength: 6,
  maxLength: 60,
  pattern: patternEmail,
};

/** ***********************************************************************
 * API STATUS CONSTANTS
 ************************************************************************ */
export const STATUS_HTTP = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZE: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  SERVER_ERROR: 500,
};

export const STATUS_API = {
  SUCCESS: STATUS_HTTP.SUCCESS,
  CREATED: STATUS_HTTP.CREATED,
  WARNING: 40,
  ERROR: 50,
};

/** ***********************************************************************
 * API URL
 ************************************************************************ */
export const API_URL = {
  BASE: 'base',
  GITHUB: 'github',
};

export const STATUS_HTTP_MESSAGES = {
  [STATUS_HTTP.SUCCESS]: 'Succès: La requête a réussi',
  [STATUS_HTTP.CREATED]: 'Succès: Création réussie',
  [STATUS_HTTP.BAD_REQUEST]: 'Erreur: La syntaxe de la requête est erronée',
  [STATUS_HTTP.UNAUTHORIZE]: 'Erreur: Une authentification est nécessaire pour accéder à la ressource',
  [STATUS_HTTP.FORBIDDEN]: 'Erreur: Accès non autorisé',
  [STATUS_HTTP.NOTFOUND]: 'Erreur: Elément non trouvé',
  [STATUS_HTTP.SERVER_ERROR]: 'Erreur: Problème technique ! Contacter votre support',
};

/** ***********************************************************************
 * USER CONSTANTS
 ************************************************************************ */

export const ADMIN = 'Admin';
export const READER = 'Reader';
export const WRITER = 'Writer';
export const USER = 'User';
export const ALL = '';

export const PROFILS = [ADMIN, READER, WRITER, USER, ALL];

/** ***********************************************************************
 * COMMONS CONSTANTS
 ************************************************************************ */

export const MODIFIER_CLASS = {
  success: 'success',
  disabled: 'disabled',
};

/** ***********************************************************************
 * VERSION CONSTANT
 ************************************************************************ */

const VERSION_TOOLKIT = 'master';

/** ***********************************************************************
 * DEMO CONSTANTS
 ************************************************************************ */

export const STORYBOOK = 'https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/';
export const DESIGN_SYSTEM = 'https://axafrance.github.io/design-system/';
export const GITHUB = `https://github.com/AxaGuilDEv/react-toolkit/tree/v${packageJson.dependencies['@axa-fr/react-toolkit-all']}/packages/`;
export const GITHUB_API = `AxaGuilDEv/react-toolkit/${VERSION_TOOLKIT}/packages/`;
