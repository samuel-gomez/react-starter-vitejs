import { createContext, ReactNode, useMemo, useContext } from 'react';
import { QueryClient, QueryClientProvider, QueryKey } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { API_URL, STATUS_API, STATUS_HTTP_MESSAGES } from 'shared/constants';
import { useOidcAccessToken } from '@axa-fr/react-oidc';
import fetch from 'cross-fetch';
import { EnvironmentContext } from 'App/EnvironmentProvider';
import { mergeObj, manageConfig } from 'shared/helpers';
import setResponseError from './setResponseError';

export type TFetchCustom = <T>(params: unknown[] | { path: string; customConfig: object }) => Promise<T>;

export type FetchContextType = {
  fetchCustom: TFetchCustom;
  queryClient: QueryClient;
};

export const FetchContext = createContext<FetchContextType | object>({});
FetchContext.displayName = 'FetchContext';

export type TsetFetchCustom = {
  apiUrl: Record<string, string>;
  fetchAuthConfig: object;
  fetchFn?: typeof fetch;
  mergeObjFn?: typeof mergeObj;
  manageConfigFn?: typeof manageConfig;
};

export type TResponse = {
  status: number;
  blob: () => Promise<unknown>;
  text: () => Promise<unknown>;
  json: () => Promise<object>;
};

type TConfig = {
  blob: boolean;
  text: boolean;
};

export const computeDataError = async (response: TResponse, setResponseErrorFn = setResponseError) => {
  try {
    const data = await response.json();
    return setResponseErrorFn({ response: { ...data, status: response.status } });
  } catch (error) {
    return setResponseErrorFn({ response: { anomaly: { label: STATUS_HTTP_MESSAGES[response.status] }, status: response.status } });
  }
};

export const buildResponse = async (response: TResponse, config: TConfig, computeDataErrorFn = computeDataError) => {
  const { status } = response;
  switch (true) {
    case `${status}`.startsWith(`${STATUS_API.ERROR}`):
    case `${status}`.startsWith(`${STATUS_API.WARNING}`): {
      throw await computeDataErrorFn(response);
    }
    case `${status}` === `${STATUS_API.SUCCESS}`:
      if (config.blob) {
        return response.blob();
      }
      if (config.text) {
        return response.text();
      }
      return {
        ...(await response.json()),
        statusHttp: status,
      };
    default:
      return {
        statusHttp: status,
      };
  }
};

export const setFetchCustom =
  ({ apiUrl, fetchAuthConfig, fetchFn = fetch, mergeObjFn = mergeObj, manageConfigFn = manageConfig }: TsetFetchCustom) =>
  async (queryKey: QueryKey) => {
    const [path, customConfig, apiName = API_URL.BASE]: QueryKey = queryKey;
    const url = `${apiUrl[apiName as string]}${path}`;
    const fetchAuthConfigCustom = manageConfigFn(apiName as string, fetchAuthConfig);
    const config = mergeObjFn(fetchAuthConfigCustom, customConfig);
    const response = await fetchFn(url, config);
    return buildResponse(response, config as TConfig);
  };

export type TFetchProvider = Pick<TsetFetchCustom, 'mergeObjFn'> & {
  children: ReactNode;
  useOidcAccessTokenFn?: typeof useOidcAccessToken;
  setQueryClientFn?: typeof setQueryClient;
  setFetchCustomFn?: typeof setFetchCustom;
  showReactQueryDevtoolsComponent?: (process?: string) => JSX.Element | boolean;
};

export const defaultQueryWithAuth = async (queryKey: QueryKey, fetchCustom: ReturnType<typeof setFetchCustom>) => fetchCustom(queryKey);

export const showReactQueryDevtools = (process?: string) =>
  process === 'development' && <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />;

type TsetQueryClient = {
  fetchCustom: ReturnType<typeof setFetchCustom>;
  setQueryFn?: typeof setQuery;
};

export const setQuery =
  (fetchCustom: ReturnType<typeof setFetchCustom>) =>
  ({ queryKey, defaultQueryWithAuthFn = defaultQueryWithAuth }: { queryKey: QueryKey; defaultQueryWithAuthFn?: typeof defaultQueryWithAuth }) =>
    defaultQueryWithAuthFn(queryKey, fetchCustom);

export const setQueryClient = ({ fetchCustom, setQueryFn = setQuery }: TsetQueryClient) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        queryFn: setQueryFn(fetchCustom),
      },
    },
  });

const FetchProvider = ({
  children,
  mergeObjFn = mergeObj,
  setFetchCustomFn = setFetchCustom,
  useOidcAccessTokenFn = useOidcAccessToken,
  showReactQueryDevtoolsComponent = showReactQueryDevtools,
  setQueryClientFn = setQueryClient,
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
  const queryClient = setQueryClientFn({ fetchCustom });
  const value = useMemo(() => ({ fetchCustom, queryClient }), [fetchCustom, queryClient]);

  return (
    <FetchContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        {children}
        {showReactQueryDevtoolsComponent(process.env.NODE_ENV)}
      </QueryClientProvider>
    </FetchContext.Provider>
  );
};
export default FetchProvider;
