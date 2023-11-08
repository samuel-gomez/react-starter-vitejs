import { useOidcUser } from '@axa-fr/react-oidc';
import isEmpty from 'lodash/isEmpty';
import { PROFILS } from 'shared/constants';
import useOidcUserMock, { NON_CONNECTE } from './constants';

type ToidcUser = {
  member_of?: string[];
  name?: string;
  axa_uid_racf?: string;
};

/**
 * getAuthName
 */

type TgetAuthName = {
  oidcUser: ToidcUser;
  isEmptyFn?: typeof isEmpty;
};

export const getAuthName = ({ oidcUser, isEmptyFn = isEmpty }: TgetAuthName) => (!isEmptyFn(oidcUser?.name ?? '') ? oidcUser.name : NON_CONNECTE);

/**
 * setAuthRole
 */
type TsetAuthRole = {
  memberOf: string;
  profils?: typeof PROFILS;
};

export const setAuthRole = ({ memberOf, profils = PROFILS }: TsetAuthRole) =>
  profils.map(profil => (memberOf.search(`${profil}`) !== -1 ? profil : '')).join('') || memberOf;

/**
 * getAuthRole
 */

type TgetAuthRole = {
  oidcUser: ToidcUser;
  setAuthRoleFn?: typeof setAuthRole;
};

export const getAuthRole = ({ oidcUser, setAuthRoleFn = setAuthRole }: TgetAuthRole) =>
  setAuthRoleFn({ memberOf: oidcUser?.member_of?.[0].replace('CN=', '') ?? '' });

/**
 * getAuthUid
 */

type TgetAuthUid = {
  oidcUser: ToidcUser;
  isEmptyFn?: typeof isEmpty;
};

export const getAuthUid = ({ oidcUser }: TgetAuthUid) => oidcUser?.axa_uid_racf ?? '';

/**
 * extractDataFromOAuthToken
 * @param {Object} oidcUser
 */

type TextractDataFromOAuthToken = {
  oidcUser: ToidcUser;
  getAuthNameFn?: typeof getAuthName;
  getAuthRoleFn?: typeof getAuthRole;
  getAuthUidFn?: typeof getAuthUid;
};

export const extractDataFromOAuthToken = ({
  oidcUser,
  getAuthNameFn = getAuthName,
  getAuthRoleFn = getAuthRole,
  getAuthUidFn = getAuthUid,
}: TextractDataFromOAuthToken) => ({
  authName: getAuthNameFn({ oidcUser }),
  authRole: getAuthRoleFn({ oidcUser }),
  authUid: getAuthUidFn({ oidcUser }),
  isLoading: !oidcUser,
});

export const getUserInfos = ({
  isEnabled,
  useOidcUserFn = useOidcUser,
  useOidcUserMockFn = useOidcUserMock,
}: {
  isEnabled?: boolean;
  useOidcUserFn?: typeof useOidcUser;
  useOidcUserMockFn?: typeof useOidcUserMock;
}) => (isEnabled ? useOidcUserFn : useOidcUserMockFn);
