import { Action, ToggleButton } from '@axa-fr/react-toolkit-all';
import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, type TMenu } from './Menu';
import type { TMenuItemBase } from './MenuItem';
import MENU_ITEMS, { CLASS_BODY_MENU_OPEN } from './constants';

const isNotNull = (item: unknown) => item !== null;

type TsetPositionInit = {
  menuItems: TMenuItemBase[];
  pathname: string;
  isChildren?: boolean;
};
export const setPositionInit = ({ menuItems, pathname, isChildren }: TsetPositionInit) => {
  const listItemsPosition: (number | null)[] = menuItems.map((navItem, index) => {
    const subIndex: number | null | undefined = navItem.children
      ? setPositionInit({ menuItems: navItem.children, pathname, isChildren: true })
      : undefined;
    if (isChildren) {
      return pathname === navItem.url ? index : null;
    }
    return pathname === navItem.url || subIndex !== undefined ? index : null;
  });

  return listItemsPosition.find(isNotNull);
};

type TsetToggleMenu = {
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
  documentObj?: Document;
};

export const setToggleMenu = ({ setIsMenuVisible, isVisible, documentObj = document }: TsetToggleMenu) => {
  const { body } = documentObj;
  body.classList.toggle(CLASS_BODY_MENU_OPEN);
  setIsMenuVisible(!isVisible);
};

export const useMenuVisible = (initState = false) => {
  const [isVisible, setIsMenuVisible] = useState(initState);
  return { isVisible, setIsMenuVisible };
};

export const computeMenuItems = (menuItems: TMenu['menuItems'] = [], basePathParent?: string) =>
  menuItems.map(({ basePathChildren, ...item }) => {
    if (item.children) {
      const children: TMenuItemBase[] = basePathChildren ? computeMenuItems(item.children, basePathChildren) : computeMenuItems(item.children);

      return { ...item, children };
    }

    if (basePathParent && item.url) {
      return { ...item, url: `${basePathParent}/${item.url}` };
    }
    return item;
  });

type TMenuEnhanced = {
  setPositionInitFn?: typeof setPositionInit;
  setToggleMenuFn?: typeof setToggleMenu;
  useLocationFn?: typeof useLocation;
  useMenuVisibleFn?: typeof useMenuVisible;
  computeMenuItemsFn?: typeof computeMenuItems;
  menuItems?: TMenu['menuItems'];
} & TMenu;

const MenuEnhanced = ({
  menuItems = MENU_ITEMS,
  setPositionInitFn = setPositionInit,
  setToggleMenuFn = setToggleMenu,
  useLocationFn = useLocation,
  useMenuVisibleFn = useMenuVisible,
  computeMenuItemsFn = computeMenuItems,
  ...rest
}: TMenuEnhanced) => {
  const computedMenuItems = useMemo(() => computeMenuItemsFn(menuItems), [computeMenuItemsFn, menuItems]);
  const { pathname } = useLocationFn();
  const positionInit = useMemo(() => setPositionInitFn({ menuItems: computedMenuItems, pathname }), [computedMenuItems, pathname, setPositionInitFn]);
  const { isVisible, setIsMenuVisible } = useMenuVisibleFn();

  const toggleMenu = useCallback(() => setToggleMenuFn({ setIsMenuVisible, isVisible }), [isVisible, setIsMenuVisible, setToggleMenuFn]);

  return (
    <>
      <Menu {...rest} menuItems={computedMenuItems} isVisible={isVisible} onClick={toggleMenu} positionInit={positionInit || 0} />
      <ToggleButton idControl="mainmenu">
        <Action
          className="btn af-title-bar__mobile-menu af-btn--circle"
          id="opentogglemenu"
          icon="menu-hamburger"
          title="Open toggle menu"
          onClick={toggleMenu}
        />
      </ToggleButton>
    </>
  );
};

export default MenuEnhanced;
