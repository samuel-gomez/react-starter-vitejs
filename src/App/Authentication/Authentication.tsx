import { ReactNode, useContext } from 'react';
import { OidcProvider } from '@axa-fr/react-oidc';
import { EnvironmentContext } from 'App/EnvironmentProvider';

const Authentication = ({ children }: { children: ReactNode }) => {
  const { environment } = useContext(EnvironmentContext);

  return environment?.oidc?.isEnabled ? <OidcProvider configuration={environment?.oidc}>{children}</OidcProvider> : <>{children}</>;
};

export default Authentication;
