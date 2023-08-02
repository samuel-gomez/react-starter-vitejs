import { vi } from 'vitest';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FetchProvider from 'App/FetchProvider';
import UserProvider from 'App/UserProvider';
import EnvironmentProvider from 'App/EnvironmentProvider';
import { ReactElement, ReactNode } from 'react';
import MOCK_API_URL from './constants';

type TMockProvider = {
  [x: string]: Record<string, unknown | number | string> | string | boolean;
};

const MockProviders =
  ({ role = '', isEnabled = true, route = '/', ...testMock }: TMockProvider) =>
  ({ children }: { children: ReactNode }) => {
    const useOidcAccessTokenFn = vi.fn().mockReturnValue({ accessToken: 'accessToken' });
    const useOidcUserFn = vi.fn().mockReturnValueOnce({ oidcUser: { member_of: [`CN=${role}`], name: 'Samuel Gomez' } });

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

    return (
      <EnvironmentProvider useEnvFn={useEnvFn}>
        <UserProvider useOidcUserFn={useOidcUserFn}>
          <FetchProvider useOidcAccessTokenFn={useOidcAccessTokenFn}>
            <MemoryRouter initialEntries={[`${route}`]}>{children}</MemoryRouter>
          </FetchProvider>
        </UserProvider>
      </EnvironmentProvider>
    );
  };

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>, testMock: TMockProvider = { role: '' }) =>
  render(ui, { wrapper: MockProviders(testMock), ...options });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender as render };
