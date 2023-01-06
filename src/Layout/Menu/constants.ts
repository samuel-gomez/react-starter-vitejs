import ROUTE_URL from 'App/Routes/constants';

export const CLASS_BODY_MENU_OPEN = 'af-menu-open';

const MENU_ITEMS = [
  {
    label: 'Accueil',
    url: ROUTE_URL.HOME,
  },
  {
    label: 'Démos',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Membres',
        url: ROUTE_URL.MEMBERS,
      },
      {
        label: 'Rechercher',
        url: ROUTE_URL.SEARCHMEMBERS,
      },
      {
        label: 'Modal',
        url: ROUTE_URL.MODAL_CUSTOM,
      },
      {
        label: 'Notification',
        url: ROUTE_URL.NOTIFICATION,
      },
    ],
  },
  {
    label: 'Toolkit components',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Accordion',
        url: ROUTE_URL.ACCORDION,
      },
      {
        label: 'Action',
        url: ROUTE_URL.ACTION,
      },
      {
        label: 'Alert',
        url: ROUTE_URL.ALERT,
      },
      {
        label: 'Badge',
        url: ROUTE_URL.BADGE,
      },
      {
        label: 'Button',
        url: ROUTE_URL.BUTTON,
      },
      {
        label: 'Help',
        url: ROUTE_URL.HELP,
      },
      {
        label: 'Loader',
        url: ROUTE_URL.LOADER,
      },
      {
        label: 'Modal',
        url: ROUTE_URL.MODAL,
      },
      {
        label: 'Popover',
        url: ROUTE_URL.POPOVER,
      },
      {
        label: 'Restitution',
        url: ROUTE_URL.RESTITUTION,
      },
      {
        label: 'Table',
        url: ROUTE_URL.TABLE,
      },
      {
        label: 'Tabs',
        url: 'tabs',
      },

      {
        label: 'Title',
        url: 'title',
      },
    ],
  },
  {
    label: 'Toolkit structure',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Footer',
        url: ROUTE_URL.FOOTER,
      },
      {
        label: 'Footer Client',
        url: ROUTE_URL.FOOTER_CLIENT,
      },
      {
        label: 'Header',
        url: ROUTE_URL.HEADER,
      },
      {
        label: 'Infos',
        url: ROUTE_URL.INFOS,
      },
      {
        label: 'NavBar',
        url: ROUTE_URL.NAVBAR,
      },
      {
        label: 'TitleBar',
        url: 'titlebar',
      },
    ],
  },
  {
    label: 'Toolkit form components',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Checkbox Input',
        url: ROUTE_URL.CHECKBOX_INPUT,
      },
      {
        label: 'Date Input',
        url: ROUTE_URL.DATE_INPUT,
      },
      {
        label: 'File',
        url: ROUTE_URL.FILE_INPUT,
      },
      {
        label: 'Number Input',
        url: ROUTE_URL.NUMBER_INPUT,
      },
      {
        label: 'Radio Input',
        url: ROUTE_URL.RADIO_INPUT,
      },
      {
        label: 'Select Input',
        url: ROUTE_URL.SELECT_INPUT,
      },
      {
        label: 'Select Multi',
        url: ROUTE_URL.SELECT_MULTI,
      },
      {
        label: 'Slider',
        url: ROUTE_URL.SLIDER,
      },
      {
        label: 'Stepper',
        url: ROUTE_URL.STEPPER,
      },
      {
        label: 'Switch',
        url: ROUTE_URL.SWITCH,
      },
      {
        label: 'Text Input',
        url: 'text-input',
      },
      {
        label: 'Textarea Input',
        url: 'textarea-input',
      },
      {
        label: 'Checkbox Input',
        url: 'checkbox-input',
      },
      {
        label: 'Date Input',
        url: 'date-input',
      },
    ],
  },
  {
    label: 'Pages',
    children: [
      {
        label: 'Not found',
        url: ROUTE_URL.NOTFOUND,
      },
      {
        label: 'Forbidden',
        url: ROUTE_URL.UNAUTHORIZE,
      },
    ],
  },
  {
    label: 'Layout',
    url: `/${ROUTE_URL.LAYOUT}`,
  },
];

export default MENU_ITEMS;
