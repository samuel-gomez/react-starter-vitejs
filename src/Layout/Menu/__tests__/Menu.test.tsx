import { render, screen } from 'shared/testsUtils';
import { Menu } from '../Menu';
import { expectedMock } from './Menu.mock';

const checkContent = () => {
  const menuContainer = screen.getByLabelText('Section menu');
  expect(menuContainer).toBeInTheDocument();

  const nav = screen.getByRole('navigation', { name: /Menu principal/ });
  expect(nav).toBeInTheDocument();

  const openButton = screen.getByRole('button', { name: /Open Menu/ });
  expect(openButton).toBeInTheDocument();

  const closeButton = screen.getByRole('button', { name: /Close Menu/ });
  expect(closeButton).toBeInTheDocument();

  const menuMobileTitle = screen.getByRole('heading', { level: 4, name: /Menu/ });
  expect(menuMobileTitle).toBeInTheDocument();

  const list = screen.getByRole('menubar');
  expect(list).toBeInTheDocument();

  const firstItem = screen.getByRole('menuitem', { name: /Accueil/ });
  expect(firstItem).toBeInTheDocument();

  return menuContainer;
};

describe('<Menu/>', () => {
  it('Render <Menu/>', async () => {
    render(<Menu menuItems={expectedMock} isVisible />);
    checkContent();
    // fix axe violations on Toolkit
    // expect(await axe(container)).toHaveNoViolations();
  });

  it('Render <Menu/>', async () => {
    render(<Menu menuItems={expectedMock} isVisible fullScreen />);
    const menuContainer = checkContent();
    expect(menuContainer).toHaveClass('af-menu--fullscreen');
  });
});
