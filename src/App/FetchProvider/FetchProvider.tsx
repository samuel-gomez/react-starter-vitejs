import { createContext, ReactNode, useMemo, useContext } from 'react';
import { useOidcAccessToken } from '@axa-fr/react-oidc';
import type { QueryKey } from '@tanstack/react-query';
import { EnvironmentContext } from 'App/EnvironmentProvider';
import { mergeObj } from 'shared/helpers';
import { setFetchCustom } from './FetchProvider.helpers';

export type TFetchCustom = <T>(queryKey: QueryKey) => Promise<T>;

export type FetchContextType = {
  fetchCustom: TFetchCustom;
};

export const FetchContext = createContext<FetchContextType | object>({});
FetchContext.displayName = 'FetchContext';

export type TFetchProvider = {
  mergeObjFn?: typeof mergeObj;
  children: ReactNode;
  useOidcAccessTokenFn?: typeof useOidcAccessToken;
  setFetchCustomFn?: typeof setFetchCustom;
};

const FetchProvider = ({
  children,
  mergeObjFn = mergeObj,
  setFetchCustomFn = setFetchCustom,
  useOidcAccessTokenFn = useOidcAccessToken,
}: TFetchProvider) => {
  const { environment } = useContext(EnvironmentContext);
  const { accessToken } = useOidcAccessTokenFn();

  const authConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchAuthConfig = mergeObjFn(environment?.fetchConfig, authConfig);
  const fetchCustom = setFetchCustomFn({ apiUrl: environment?.apiUrl ?? {}, fetchAuthConfig });
  const value = useMemo(() => ({ fetchCustom }), [fetchCustom]);

  return <FetchContext.Provider value={value}>{children}</FetchContext.Provider>;
};
export default FetchProvider;
