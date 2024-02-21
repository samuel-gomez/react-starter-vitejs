import { ASCENDING, type Torder } from 'shared/components/Table';

export const TITLE_BAR = 'Gestion des membres';
export const TITLE = 'Liste des membres';
export const ROUTE_URL_MEMBERS = 'members';
export const TABLE_ITEMS_TYPE = 'membres';

export const TABLE_HEADERS_MEMBERS = [
  { label: 'Prénom', field: 'firstname', id: 'firstname', key: 'firstname' },
  { label: 'Nom', field: 'lastname', id: 'lastname', key: 'lastname' },
  { label: 'Date de naissance', field: 'birthdate', id: 'birthdate', key: 'birthdate' },
  { label: 'Sexe', field: 'sexe', id: 'sexe', key: 'sexe' },
];

export const SERVICE_NAME = 'members';

export const DEFAULT_STATE_VALUE = {
  pagination: {
    total: 0,
    currentPage: 1,
    numberPages: 1,
  },
  data: [],
};

export const INITIAL_STATE_SORTING = {
  field: 'firstname',
  order: ASCENDING as Torder,
};

export const INITIAL_STATE_PAGING = {
  numberItems: 50,
  page: 1,
};
