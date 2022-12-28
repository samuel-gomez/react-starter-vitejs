export const CLASS_BODY_MENU_OPEN = 'af-menu-open';

const MENU_ITEMS = [
  {
    label: 'Accueil',
    url: '/',
  },
  {
    label: 'Démos',
    url: '/demos',
    basePathChildren: '/demos',
    children: [
      {
        label: 'Membres',
        url: 'members',
      },
      {
        label: 'Rechercher',
        url: 'search-members',
      },
      {
        label: 'Modal',
        url: 'modal-custom',
      },
      {
        label: 'Notification',
        url: 'notification',
      },
    ],
  },
  {
    label: 'Toolkit components',
    url: '/demos',
    basePathChildren: '/demos',
    children: [
      {
        label: 'Button',
        url: 'button',
      },
      {
        label: 'Action',
        url: 'action',
      },
      {
        label: 'Alert',
        url: 'alert',
      },
      {
        label: 'Restitution',
        url: 'restitution',
      },
      {
        label: 'Tabs',
        url: 'tabs',
      },
      {
        label: 'Badge',
        url: 'badge',
      },
      {
        label: 'Title',
        url: 'title',
      },
      {
        label: 'Help',
        url: 'help',
      },
      {
        label: 'Table',
        url: 'table',
      },
      {
        label: 'Popover',
        url: 'popover',
      },
      {
        label: 'Accordion',
        url: 'accordion',
      },
      {
        label: 'Loader',
        url: 'loader',
      },
      {
        label: 'Modal',
        url: 'modal',
      },
    ],
  },
  {
    label: 'Toolkit structure',
    url: '/demos',
    basePathChildren: '/demos',
    children: [
      {
        label: 'Header',
        url: 'header',
      },
      {
        label: 'TitleBar',
        url: 'titlebar',
      },
      {
        label: 'NavBar',
        url: 'navbar',
      },
      {
        label: 'Infos',
        url: 'infos',
      },
      {
        label: 'Footer Client',
        url: 'footer-client',
      },
      {
        label: 'Footer',
        url: 'footer',
      },
    ],
  },
  {
    label: 'Toolkit form components',
    url: '/demos',
    basePathChildren: '/demos',
    children: [
      {
        label: 'Text Input',
        url: 'text-input',
      },
      {
        label: 'Number Input',
        url: 'number-input',
      },
      {
        label: 'Textarea Input',
        url: 'textarea-input',
      },
      {
        label: 'Radio Input',
        url: 'radio-input',
      },
      {
        label: 'Checkbox Input',
        url: 'checkbox-input',
      },
      {
        label: 'Select Input',
        url: 'select-input',
      },
      {
        label: 'Stepper',
        url: 'stepper',
      },
      {
        label: 'Slider',
        url: 'slider',
      },
      {
        label: 'Switch',
        url: 'switch',
      },
      {
        label: 'File',
        url: 'file-input',
      },
      {
        label: 'Select Multi',
        url: 'select-multi',
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
        url: 'notfound',
      },
      {
        label: 'Forbidden',
        url: 'forbidden',
      },
    ],
  },
  {
    label: 'Layout',
    url: `/layout`,
  },
];

export default MENU_ITEMS;
