import { describe, it, expect } from 'vitest';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import NotFound from '../NotFound';

describe('<NotFound page/>', () => {
  it('Renders NotFound page component without crashing', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
