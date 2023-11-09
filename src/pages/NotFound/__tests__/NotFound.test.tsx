import { screen, render } from 'shared/testsUtils';
import NotFound from '../NotFound';

describe('<NotFound page/>', () => {
  it('Renders NotFound page component without crashing', () => {
    render(<NotFound />);
    expect(screen.getAllByLabelText("Retour à l'accueil"));
    expect(screen.getByText('404 Page Not Found')).toBeDefined();
    expect(screen.getByText('The page you are looking for is not here!')).toBeDefined();
  });
});
