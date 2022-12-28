import { ComponentPropsWithoutRef } from 'react';
import { NavBar } from '@axa-fr/react-toolkit-layout-header/dist/esm/index';
import { emptyFunction } from 'shared/helpers';
import { createMenu, TMenuItemBase } from './MenuItem';
import './Menu.scss';

export type TMenu = Omit<ComponentPropsWithoutRef<typeof NavBar>, 'children' | 'onClick'> & {
  menuItems?: TMenuItemBase[];
  createMenuFn?: typeof createMenu;
  fullScreen?: boolean;
  onClick?: ComponentPropsWithoutRef<typeof NavBar>['onClick'];
};

export const Menu = ({ fullScreen, menuItems, createMenuFn = createMenu, onClick = emptyFunction, ...navBarProps }: TMenu) => (
  <section className={`af-menu${fullScreen ? ' af-menu--fullscreen' : ''}`}>
    <NavBar {...navBarProps} onClick={onClick}>
      {menuItems && createMenuFn(menuItems, onClick)}
    </NavBar>
  </section>
);
