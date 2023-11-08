import omit from 'lodash/omit';
import { getAuthName, getAuthRole, setAuthRole, getAuthUid, getUserInfos } from '../UserProvider.helpers';

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

const profils = ['Admin', 'USER'];

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

describe('getAccessToken', () => {
  const useOidcUserFn = vi.fn();
  const useOidcUserMockFn = vi.fn();
  const defaultProps = {
    isEnabled: true,
    useOidcUserFn,
    useOidcUserMockFn,
  };

  it('Should useOidcUserFn when isEnabled true', async () => {
    const result = getUserInfos(defaultProps);
    expect(result).toEqual(useOidcUserFn);
  });

  it('Should useOidcAccessTokenMockFn when isEnabled true', async () => {
    const result = getUserInfos({ ...defaultProps, isEnabled: false });
    expect(result).toEqual(useOidcUserMockFn);
  });
});
