import { render, screen } from 'shared/testsUtils';
import { expectLink } from 'shared/testsUtils/sharedScenarios';
import { MenuItem, ActionElt } from '../MenuItem';
import menuItemsMock from './MenuItem.mock';

describe('<MenuItem/>', () => {
  it('Render <Menu/>', () => {
    render(<MenuItem label="itemmenu" ariaHaspopup="true" ariaExpanded="false" ariaLabel="itemmenu" />);
    expect(screen.getByText('itemmenu')).toBeInTheDocument();
  });

  it('Render <Menu/> with children createMenuFn to be called', () => {
    const Child = () => <p>Child</p>;
    const createMenuMock = vi.fn().mockReturnValue(<Child />);

    render(
      <MenuItem label="itemmenu" ariaHaspopup="true" ariaExpanded="false" ariaLabel="itemmenu" createMenuFn={createMenuMock}>
        {menuItemsMock}
      </MenuItem>,
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});

describe('<ActionElt/>', () => {
  it('Render <ActionElt/> with Link When url is defined', () => {
    render(<ActionElt url="/members" label="withlink" />);
    expectLink({ name: 'withlink', href: '/members' });
  });

  it('Render <ActionElt/> with span When url is not defined', () => {
    render(<ActionElt label="nolink" />);
    expect(screen.getByText('nolink')).toBeInTheDocument();
  });
});
