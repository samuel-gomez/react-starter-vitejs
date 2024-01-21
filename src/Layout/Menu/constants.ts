import ROUTE_URL from 'App/Routes/constants';

export const CLASS_BODY_MENU_OPEN = 'af-menu-open';

const MENU_ITEMS = [
  {
    label: 'Accueil',
    url: ROUTE_URL.HOME,
  },
  {
    label: 'People',
    url: `/${ROUTE_URL.PEOPLE}`,
  },
];

export default MENU_ITEMS;
