import { createContext, ReactNode, useContext, useMemo } from 'react';
import { EnvironmentContext } from 'App/EnvironmentProvider';
import { extractDataFromOAuthToken, getUserInfos } from './UserProvider.helpers';

export type TUserContext = ReturnType<typeof extractDataFromOAuthToken> & {
  isLoading?: boolean;
};

export const UserContext = createContext<TUserContext>({
  authName: '',
  authRole: '',
  authUid: '',
  isLoading: true,
});
UserContext.displayName = 'UserContext';

type TUserProvider = {
  children: ReactNode;
  getUserInfosFn?: typeof getUserInfos;
  extractDataFromOAuthTokenFn?: typeof extractDataFromOAuthToken;
  isEnabled?: boolean;
};

const UserProvider = ({
  children,
  getUserInfosFn = getUserInfos,
  extractDataFromOAuthTokenFn = extractDataFromOAuthToken,
  ...rest
}: TUserProvider) => {
  const { environment } = useContext(EnvironmentContext);
  const { oidcUser } = getUserInfosFn({ isEnabled: environment?.oidc?.isEnabled })();

  const value = useMemo(() => ({ ...extractDataFromOAuthTokenFn({ oidcUser }), ...rest }), [extractDataFromOAuthTokenFn, oidcUser, rest]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
