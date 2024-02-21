import { OidcProvider } from '@axa-fr/react-oidc';
import { EnvironmentContext } from 'App/EnvironmentProvider';
import { useContext, type ReactNode } from 'react';

const Authentication = ({ children, OidcProviderCmpt = OidcProvider }: { children: ReactNode; OidcProviderCmpt?: typeof OidcProvider }) => {
  const { environment } = useContext(EnvironmentContext);

  return environment?.oidc?.isEnabled ? <OidcProviderCmpt configuration={environment?.oidc}>{children}</OidcProviderCmpt> : <>{children}</>;
};

export default Authentication;
