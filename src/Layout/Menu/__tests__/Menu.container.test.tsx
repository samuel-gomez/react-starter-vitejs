import { renderHook } from '@testing-library/react';
import { setPositionInit, setToggleMenu, computeMenuItems, useMenuVisible } from '../Menu.container';
import { CLASS_BODY_MENU_OPEN } from '../constants';
import { MENU_ITEMS_MOCK, expectedMock } from './Menu.mock';

describe('computeMenuItems', () => {
  it('Should return computed menuitems when computeMenuItems have been called with MENU_ITEMS_MOCK', () => {
    const result = computeMenuItems(MENU_ITEMS_MOCK);
    expect(result).toEqual(expectedMock);
  });

  it('Should return empty array when computeMenuItems have been called with no param', () => {
    const result = computeMenuItems();
    expect(result).toEqual([]);
  });
});

describe('setPositionInit', () => {
  const menuItems = [
    {
      label: 'lien 1',
      url: '/',
    },
    {
      label: 'lien 2',
      url: '/lien2',
    },
    {
      label: 'lien 3',
      children: [
        {
          label: 'enfant 1',
          url: 'lien3/enfant1',
        },
      ],
    },
  ];
  it('Should return position 0  when pathname = first item url', () => {
    const result = setPositionInit({ menuItems, pathname: '/' });
    expect(result).toEqual(0);
  });
  it('Should return position 1  when pathname = second item url', () => {
    const result = setPositionInit({ menuItems, pathname: '/lien2' });
    expect(result).toEqual(1);
  });
  it('Should return position 2  when pathname = third item children url', () => {
    const result = setPositionInit({ menuItems, pathname: 'lien3/enfant1' });
    expect(result).toEqual(2);
  });
});

describe('setToggleMenu', () => {
  const setIsMenuVisibleMock = vi.fn();
  const toggleClassMock = vi.fn();
  const documentMock = {
    ...document,
    body: {
      ...document.body,
      classList: {
        ...document.body.classList,
        toggle: toggleClassMock,
      },
    },
  };

  it('Should setIsMenuVisible to be called with true and toggleClass to be called with "af-menu-open" when isVisible = false', () => {
    setToggleMenu({ setIsMenuVisible: setIsMenuVisibleMock, isVisible: false, documentObj: documentMock });
    expect(setIsMenuVisibleMock).toBeCalledWith(true);
    expect(toggleClassMock).toBeCalledWith(CLASS_BODY_MENU_OPEN);
  });

  it('Should setIsMenuVisible to be called with false when isVisible = true', () => {
    setToggleMenu({ setIsMenuVisible: setIsMenuVisibleMock, isVisible: true });
    expect(setIsMenuVisibleMock).toBeCalledWith(false);
  });
});

describe('useMenuVisible', () => {
  it('Should return state and setState when useMenuVisible to have been called', () => {
    const { result } = renderHook(() => useMenuVisible());
    expect(result.current.isVisible).toEqual(false);
  });

  it('Should return state and setState when useMenuVisible to have been called with false', () => {
    const { result } = renderHook(() => useMenuVisible(true));
    expect(result.current.isVisible).toEqual(true);
  });
});
