import { render, screen } from '@testing-library/react';
import EnvironmentProvider from 'App/EnvironmentProvider';
import { type ReactNode } from 'react';
import Authentication from '../Authentication';

const setOidc = (isEnabled = true) => ({
  envState: {
    environment: {
      apiUrl: '/',
      fetchConfig: {},
      oidc: {
        isEnabled,
      },
    },
  },
});

const OidcProviderCmpt = ({ children }: { children: ReactNode }) => <div>with OIDC provider {children} </div>;

const renderAuthentication = (isEnabled = true) => {
  const useEnvFn = vi.fn().mockReturnValueOnce(setOidc(isEnabled));

  render(
    <EnvironmentProvider useEnvFn={useEnvFn}>
      <Authentication OidcProviderCmpt={OidcProviderCmpt}>
        <p>my child</p>
      </Authentication>
    </EnvironmentProvider>,
  );
};

describe('Authentication', () => {
  it('Should render Authentication with OidcProvider when oidc is enabled', () => {
    renderAuthentication();

    expect(screen.getByText('with OIDC provider')).toBeDefined();
    expect(screen.getByText('my child')).toBeDefined();
  });

  it('Should render Authentication without OidcProvider when oidc is not enabled', () => {
    renderAuthentication(false);

    expect(screen.queryByText('with OIDC provider')).toBeNull();
    expect(screen.getByText('my child')).toBeDefined();
  });
});
