import tableData from './tableData.json';

export const TITLE_BAR = 'Gestion des collaborateurs';
export const TITLE = 'Liste des collaborateurs';
export const ROUTE_URL_EMPLOYEES = 'employees';
export const TABLE_ITEMS_TYPE = 'collaborateurs';

export const SERVICE_NAME = 'employees';

export const TABLE_HEADERS = [
  { id: 'header', key: 'header', isBlank: true },
  { id: 'employee1', key: 'employee1', label: 'Collaborateur 1', field: 'employee1' },
  { id: 'employee2', key: 'employee2', label: 'Collaborateur 2', field: 'employee2' },
];

export const TABLE_DATA = Object.values(tableData);
