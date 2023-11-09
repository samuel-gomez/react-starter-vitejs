import { render, screen } from 'shared/testsUtils';
import Unauthorize from '../Unauthorize';

describe('<Unauthorize page/>', () => {
  it('Renders Unauthorize page component without crashing', () => {
    render(<Unauthorize />);
    expect(screen.getByText('403 Forbidden')).toBeDefined();
    expect(screen.getByText('The page you are looking for is forbidden !')).toBeDefined();
  });
});
