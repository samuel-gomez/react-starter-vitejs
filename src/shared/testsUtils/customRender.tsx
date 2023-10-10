import { render, renderHook, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EnvironmentProvider from 'App/EnvironmentProvider';
import UserProvider from 'App/UserProvider';
import FetchProvider from 'App/FetchProvider';
import QueryProvider from 'App/QueryProvider';
import NotificationProvider from 'App/NotificationProvider';
import { ReactElement, ReactNode } from 'react';
import MOCK_API_URL from './constants';

type TMockProvider = {
  [x: string]: Record<string, unknown | number | string> | string | boolean | null | number;
};

const MockProviders =
  ({
    role = '',
    isEnabled = true,
    route = '/',
    oidcUser = { member_of: [`CN=${role}`], name: 'Samuel Gomez' },
    accessToken = 'accessToken',
    queryData,
    ...testMock
  }: TMockProvider) =>
  ({ children }: { children: ReactNode }) => {
    const useOidcAccessTokenFn = vi.fn().mockReturnValue({ accessToken });
    const useOidcUserFn = vi.fn().mockReturnValueOnce({ oidcUser });
    const useEnvFn = vi.fn().mockReturnValueOnce({
      envState: {
        environment: {
          apiUrl: MOCK_API_URL,
          fetchConfig: {
            headers: { testMock: JSON.stringify(testMock) },
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
        <UserProvider useOidcUserFn={useOidcUserFn}>
          <FetchProvider useOidcAccessTokenFn={useOidcAccessTokenFn}>
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
export { customRender as render, customRenderHook };
