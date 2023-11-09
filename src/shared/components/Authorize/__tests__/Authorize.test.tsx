import { render, screen } from 'shared/testsUtils';
import Authorize from '../Authorize';

describe('<Authorize/>', () => {
  const text = 'protected content';

  it.each`
    childrenText | authorized   | role
    ${text}      | ${['admin']} | ${undefined}
    ${text}      | ${['admin']} | ${'Admin'}
  `('Should render null, childrenText: $childrenText, authorized: $authorized, role: $role', async ({ childrenText, authorized, role }) => {
    render(
      <Authorize authorized={authorized}>
        <p>{childrenText}</p>
      </Authorize>,
      {},
      { role },
    );

    expect(screen.queryByText(childrenText)).toBeNull();
  });

  it.each`
    childrenText | authorized           | role
    ${text}      | ${undefined}         | ${undefined}
    ${text}      | ${['Admin', 'User']} | ${'Admin'}
  `('Should render children, childrenText: $childrenText, authorized: $authorized, role: $role', async ({ childrenText, authorized, role }) => {
    render(
      <Authorize authorized={authorized}>
        <p>{childrenText}</p>
      </Authorize>,
      {},
      { role },
    );

    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });
});
