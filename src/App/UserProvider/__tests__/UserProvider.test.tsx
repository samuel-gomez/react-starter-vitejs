import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import UserProvider, { UserContext } from '../UserProvider';

type TBase = {
  authName: string | undefined;
  authRole: string;
  authUid: string;
  isLoading?: boolean;
};

const Base = ({ authName, authRole, authUid, isLoading }: TBase) => (
  <ul>
    <li>{isLoading ? 'have isLoading' : 'notHave isLoading'}</li>
    <li>{authName ? 'have authName' : 'notHave authName'}</li>
    <li>{authRole ? 'have authRole' : 'notHave authRole'}</li>
    <li>{authUid ? 'have authUid' : 'notHave authUid'}</li>
  </ul>
);

const BaseWithUser = () => {
  const userProps = useContext(UserContext);
  return <Base {...userProps} />;
};

const oidcUser = {
  name: 'Bob Smith',
  given_name: 'Bob',
  family_name: 'Smith',
  email: 'BobSmith@email.com',
  email_verified: true,
  website: 'https://bob.com',
  sub: '11',
  member_of: ['CN=Admin'],
  axa_uid_racf: 'S000007',
};

const getUserInfosMock = vi.fn().mockReturnValue(() => ({
  oidcUser,
}));

const App = () => (
  <UserProvider getUserInfosFn={getUserInfosMock}>
    <BaseWithUser />
  </UserProvider>
);

describe('Render App with Base have user props', () => {
  it('Should Base have user props when render App with UserProvider', () => {
    render(<App />);

    expect(screen.getByText('have authName')).toBeDefined();
    expect(screen.getByText('have authRole')).toBeDefined();
    expect(screen.getByText('have authUid')).toBeDefined();
    expect(screen.getByText('notHave isLoading')).toBeDefined();
  });
});
