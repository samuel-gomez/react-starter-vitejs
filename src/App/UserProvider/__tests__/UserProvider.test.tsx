import { describe, it, expect, vi } from 'vitest';
import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import omit from 'lodash/omit';
import UserProvider, { UserContext, getAuthName, getAuthRole, setAuthRole, getAuthUid } from '../UserProvider';

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
  website: 'http://bob.com',
  sub: '11',
  member_of: ['CN=Admin'],
  axa_uid_racf: 'S000007',
};

const profils = ['Admin', 'USER'];

const useOidcUserMock = vi.fn().mockReturnValue({
  oidcUser,
});

const App = () => (
  <UserProvider useOidcUserFn={useOidcUserMock}>
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

describe('getAuthName', () => {
  it('Should return "Bob Smith" when getAuthName called with profile name "Bob Smith" ', () => {
    const result = getAuthName({ oidcUser });
    expect(result).toEqual('Bob Smith');
  });

  it('Should return "" when getAuthName called with no name profile', () => {
    const result = getAuthName({ oidcUser: { ...omit(oidcUser, 'name') } });
    expect(result).toEqual('Non Connecté');
  });
});

describe('getAuthRole', () => {
  it('Should return Admin when getAuthRole called with profile member_of "CN=Admin" ', () => {
    const setAuthRoleFn = vi.fn().mockReturnValue('Admin');
    const result = getAuthRole({ oidcUser, setAuthRoleFn });

    expect(result).toEqual('Admin');
    expect(setAuthRoleFn).toHaveBeenCalledWith({ memberOf: 'Admin' });
  });

  it('Should return "" when getAuthRole called with no profile member_of', () => {
    const result = getAuthRole({ oidcUser: { ...omit(oidcUser, 'member_of') } });
    expect(result).toEqual('');
  });

  it('Should return "" when getAuthRole called with empty member_of', () => {
    const setAuthRoleFn = vi.fn().mockReturnValue('');
    const result = getAuthRole({ oidcUser: { ...oidcUser, member_of: [''] }, setAuthRoleFn });

    expect(result).toEqual('');
    expect(setAuthRoleFn).toHaveBeenCalledWith({ memberOf: '' });
  });
});

describe('getAuthUid', () => {
  it('Should return S000007 when getAuthUID called with profile axa_uid_racf = "S000007" ', () => {
    const result = getAuthUid({ oidcUser });
    expect(result).toEqual('S000007');
  });

  it('Should return "" when getAuthUID called with no profile axa_uid_racf', () => {
    const result = getAuthUid({ oidcUser: { ...omit(oidcUser, 'axa_uid_racf') } });
    expect(result).toEqual('');
  });
});

describe('setAuthRole', () => {
  it('Should return Admin when memberOf contain Admin ', () => {
    const result = setAuthRole({ memberOf: 'Admin', profils });
    expect(result).toEqual('Admin');
  });

  it('Should return "" when memberOf not autorized', () => {
    const result = setAuthRole({ memberOf: 'OTHER', profils });
    expect(result).toEqual('OTHER');
  });
});
