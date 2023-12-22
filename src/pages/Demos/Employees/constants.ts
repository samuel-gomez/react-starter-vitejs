export const TITLE_BAR = 'Gestion des collaborateurs';
export const TITLE = 'Liste des collaborateurs';
export const ROUTE_URL_EMPLOYEES = 'employees';
export const TABLE_ITEMS_TYPE = 'collaborateurs';

export const TABLE_HEADERS = [
  { id: 'header', key: 'header', isBlank: true },
  { id: 'employee1', key: 'employee1', label: 'Collaborateur 1', field: 'employee1' },
  { id: 'employee2', key: 'employee2', label: 'Collaborateur 2', field: 'employee2' },
];

export const SERVICE_NAME = 'employees';

export const TABLE_DATA = [
  {
    key: '1',
    cols: {
      header: {
        id: 'contact',
        label: 'Contact',
        isHeader: true,
      },
      employee1: {
        label: 'James Philips',
        headers: 'employee1 contact',
      },
      employee2: {
        label: 'Marie Beauchamp',
        headers: 'employee2 contact',
      },
    },
  },
  {
    key: '2',
    cols: {
      header: {
        id: 'position',
        label: 'Position',
        isHeader: true,
      },
      employee1: {
        label: 'Directeur des ventes',
        headers: 'employee1 position',
      },
      employee2: {
        label: 'Manager des ventes',
        headers: 'employee2 position',
      },
    },
  },
  {
    key: '3',
    cols: {
      header: {
        id: 'email',
        label: 'Email',
        isHeader: true,
      },
      employee1: {
        label: 'jp@1ltd.example.com',
        headers: 'employee1 email',
      },
      employee2: {
        label: 'marie@2co.example.com',
        headers: 'employee2 email',
      },
    },
  },
];
