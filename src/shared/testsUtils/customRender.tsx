import { vi } from 'vitest';
import { render, RenderOptions } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import FetchProvider from 'App/FetchProvider';
import UserProvider from 'App/UserProvider';
import { ReactElement, ReactNode } from 'react';
import MOCK_API_URL from './constants';

type TMockProvider = {
  [x: string]: Record<string, unknown | number | string> | string;
};

const MockProviders =
  ({ role = '', ...testMock }: TMockProvider) =>
  ({ children }: { children: ReactNode }) => {
    const useOidcAccessTokenFn = vi.fn().mockReturnValue({ accessToken: 'accessToken' });
    const useOidcUserFn = vi.fn().mockReturnValueOnce({ oidcUser: { member_of: [`CN=${role}`], name: 'Samuel Gomez' } });
    return (
      <UserProvider useOidcUserFn={useOidcUserFn}>
        <FetchProvider
          apiUrl={MOCK_API_URL}
          fetchConfig={{
            headers: { testMock: JSON.stringify(testMock) },
          }}
          useOidcAccessTokenFn={useOidcAccessTokenFn}
        >
          <StaticRouter location="">{children}</StaticRouter>
        </FetchProvider>
      </UserProvider>
    );
  };

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>, testMock: TMockProvider = { role: '' }) =>
  render(ui, { wrapper: MockProviders(testMock), ...options });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender as render };
