import { describe, it, expect } from 'vitest';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { Menu } from '../Menu';
import { expectedMock } from './Menu.mock';

describe('<Menu/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Menu menuItems={expectedMock} isVisible />);
    expect(asFragment()).toMatchSnapshot();
  });
});
