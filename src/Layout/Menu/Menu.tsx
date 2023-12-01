import { ComponentPropsWithoutRef } from 'react';
import { NavBar } from '@axa-fr/react-toolkit-all';
import { emptyFunction } from 'shared/helpers';
import { createMenu, TMenuItemBase } from './MenuItem';
import './Menu.scss';

export type TMenu = Omit<ComponentPropsWithoutRef<typeof NavBar>, 'children' | 'onClick'> & {
  menuItems?: TMenuItemBase[];
  createMenuFn?: typeof createMenu;
  fullScreen?: boolean;
  onClick?: ComponentPropsWithoutRef<typeof NavBar>['onClick'];
  ariaLabel?: string;
};

export const Menu = ({
  fullScreen,
  menuItems,
  ariaLabel = 'Section menu',
  createMenuFn = createMenu,
  onClick = emptyFunction,
  ...navBarProps
}: TMenu) => (
  <section aria-label={ariaLabel} className={`af-menu${fullScreen ? ' af-menu--fullscreen' : ''}`}>
    <NavBar {...navBarProps} onClick={onClick}>
      {menuItems && createMenuFn(menuItems, onClick)}
    </NavBar>
  </section>
);
