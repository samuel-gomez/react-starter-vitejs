import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import Footer from '../Footer';

const checkContent = () => {
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeDefined();
  const footerScope = within(footer);
  expect(footerScope.getByText(/AXA Tous droits réservés/i)).toBeInTheDocument();
  expect(footerScope.getByAltText(/Logo Axa/)).toBeInTheDocument();
  const link = footerScope.getByRole('link');
  expect(link).toHaveAttribute('href', 'https://www.axa.fr/');
  return footer;
};

it('Render <Footer/>', async () => {
  const { container } = render(<Footer />);
  checkContent();
  expect(await axe(container)).toHaveNoViolations();
});

it('Render <Footer/> in fullscreen mode', () => {
  render(<Footer fullScreen />);
  const footer = checkContent();
  expect(footer).toHaveClass('af-footer--fullscreen');
});
