import { render, renderHook, type RenderOptions } from '@testing-library/react';
import EnvironmentProvider from 'App/EnvironmentProvider';
import FetchProvider from 'App/FetchProvider';
import NotificationProvider from 'App/NotificationProvider';
import QueryProvider from 'App/QueryProvider';
import UserProvider from 'App/UserProvider';
import { type ReactElement, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import MOCK_API_URL from './constants';

type TMockProvider = {
  [x: string]: Record<string, unknown | number | string> | string | boolean | null | number | Record<string, number | string>[];
};

const MockProviders =
  ({
    role = '',
    isEnabled = true,
    route = '/',
    oidcUser = { member_of: [`CN=${role}`], name: 'Samuel Gomez' },
    accessToken = 'accessToken',
    queryData,
    headers = {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }: TMockProvider) =>
  ({ children }: { children: ReactNode }) => {
    const getAccessTokenFn = vi.fn().mockReturnValue(() => ({ accessToken }));
    const getUserInfosFn = vi.fn().mockReturnValueOnce(() => ({ oidcUser }));
    const useEnvFn = vi.fn().mockReturnValueOnce({
      envState: {
        environment: {
          apiUrl: MOCK_API_URL,
          fetchConfig: {
            headers,
          },
          oidc: {
            isEnabled,
          },
        },
      },
    });

    const queriesOptions = {
      retry: false,
      ...(queryData ? { queryFn: () => queryData } : {}),
    };

    return (
      <EnvironmentProvider useEnvFn={useEnvFn}>
        <UserProvider getUserInfosFn={getUserInfosFn}>
          <FetchProvider getAccessTokenFn={getAccessTokenFn}>
            <QueryProvider queriesOptions={queriesOptions}>
              <NotificationProvider>
                <MemoryRouter initialEntries={[`${route}`]}>{children}</MemoryRouter>
              </NotificationProvider>
            </QueryProvider>
          </FetchProvider>
        </UserProvider>
      </EnvironmentProvider>
    );
  };

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>, testMock: TMockProvider = { role: '' }) =>
  render(ui, { wrapper: MockProviders(testMock), ...options });

type TcustomRenderHook = (testMock?: TMockProvider) => typeof renderHook;

const customRenderHook: TcustomRenderHook = testMock => (hook, options) => renderHook(hook, { wrapper: MockProviders(testMock ?? {}), ...options });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { axe } from 'jest-axe';

// override render method
export { customRenderHook, customRender as render };
