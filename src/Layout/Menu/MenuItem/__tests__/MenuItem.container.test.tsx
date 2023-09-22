import { render, screen } from 'shared/testsUtils';
import { expectLink } from 'shared/testsUtils/sharedScenarios';
import MenuItemEnhanced from '../MenuItem.container';
import menuItemsMock from './MenuItem.mock';

describe('<MenuItemEnhanced/>', () => {
  it('Render <MenuItem /> with ', async () => {
    render(<MenuItemEnhanced label="testitem" />);
    expect(screen.getByText('testitem')).toBeInTheDocument();
  });

  it('Render <MenuItem /> hasChild', async () => {
    render(<MenuItemEnhanced label="test">{menuItemsMock}</MenuItemEnhanced>);
    expectLink({ role: 'menuitem', name: 'Slash DS', href: '/slash' });
  });

  it('Render <MenuItem /> with', async () => {
    render(<MenuItemEnhanced label="testlink" basePath="/demos" url="path" />);
    expectLink({ role: 'menuitem', name: 'testlink', href: '/demos/path' });
  });
});
