import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { OidcSecure } from '@axa-fr/react-oidc';

import ROUTE_URL from 'App/Routes/constants';
import Loader, { MODES } from 'shared/components/Loader';
import { PROFILS } from 'shared/constants';
import { EnvironmentContext } from 'App/EnvironmentProvider';
import { UserContext } from 'App/UserProvider';

export const AuthorizedProfile = ({
  UserContextObj = UserContext,
  authorized = PROFILS,
  OutletCmpt = Outlet,
  NavigateCmpt = Navigate,
  LoaderCmpt = Loader,
  loaderText = 'Chargement des données utilisateur...',
}) => {
  const { isLoading, authRole } = useContext(UserContextObj);
  const { environment } = useContext(EnvironmentContext);

  if (environment?.oidc?.isEnabled && isLoading) {
    return <LoaderCmpt text={loaderText} mode={MODES.get} classModifier="fullscreen" />;
  }

  return authorized.includes(authRole) || !environment?.oidc?.isEnabled ? <OutletCmpt /> : <NavigateCmpt to={ROUTE_URL.UNAUTHORIZE} />;
};

const RouteSecure = ({ OidcSecureCmpt = OidcSecure }) => (
  <OidcSecureCmpt>
    <AuthorizedProfile />
  </OidcSecureCmpt>
);

export default RouteSecure;
