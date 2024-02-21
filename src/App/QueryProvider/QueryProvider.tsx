import { QueryClient, QueryClientProvider, type DefaultOptions, type QueryKey } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { FetchContextType, TFetchCustom } from 'App/FetchProvider';
import { FetchContext } from 'App/FetchProvider';
import { useContext, type ReactNode } from 'react';
import { CACHE_TIME, REFETCH_ON_WINDOWS_FOCUS, RETRY_REQUEST } from './constants';

export const defaultQueryWithAuth = async (queryKey: QueryKey, fetchCustom: TFetchCustom) => fetchCustom(queryKey);

export const showReactQueryDevtools = (process?: string) =>
  process === 'development' && <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />;

type TsetQueryClient = {
  fetchCustom: TFetchCustom;
  setQueryFn?: typeof setQuery;
};

export const setQuery =
  (fetchCustom: TFetchCustom) =>
  ({ queryKey, defaultQueryWithAuthFn = defaultQueryWithAuth }: { queryKey: QueryKey; defaultQueryWithAuthFn?: typeof defaultQueryWithAuth }) =>
    defaultQueryWithAuthFn(queryKey, fetchCustom);

const queryClient = new QueryClient();

export const setQueryClient = ({ fetchCustom, setQueryFn = setQuery, ...queriesOptions }: TsetQueryClient) =>
  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: REFETCH_ON_WINDOWS_FOCUS,
      retry: RETRY_REQUEST,
      gcTime: CACHE_TIME,
      queryFn: setQueryFn(fetchCustom),
      ...queriesOptions,
    },
  });

export type TQueryProvider = {
  children: ReactNode;
  queryClientObj?: QueryClient;
  setQueryClientFn?: typeof setQueryClient;
  showReactQueryDevtoolsComponent?: (process?: string) => JSX.Element | boolean;
  queriesOptions?: DefaultOptions<unknown>['queries'];
};

const QueryProvider = ({
  children,
  showReactQueryDevtoolsComponent = showReactQueryDevtools,
  setQueryClientFn = setQueryClient,
  queryClientObj = queryClient,
  queriesOptions = {},
}: TQueryProvider) => {
  const { fetchCustom } = useContext(FetchContext) as FetchContextType;

  setQueryClientFn({ fetchCustom, ...queriesOptions });

  return (
    <QueryClientProvider client={queryClientObj}>
      {children}
      {showReactQueryDevtoolsComponent(process.env.NODE_ENV)}
    </QueryClientProvider>
  );
};
export default QueryProvider;
