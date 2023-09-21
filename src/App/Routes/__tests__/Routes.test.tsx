import { describe, it, expect } from 'vitest';
import { PropsWithChildren } from 'react';
import { render, screen, waitFor, act } from 'shared/testsUtils/customRender';

import { PROFILS } from 'shared/constants';
import { TITLE as TITLE_HOME } from 'pages/Home';
import { TITLE as TITLE_DEMOS } from 'pages/Demos/SlashDesignSystem';
import { TITLE as TITLE_P } from 'pages/Demos/ProtectedPage';
import { TITLE as TITLE_NOTFOUND } from 'pages/NotFound';
import { TITLE as TITLE_UNAUTHORIZE } from 'pages/Unauthorize';
import Routes, { ROUTE_URLS } from '..';
import { RouteSecure } from '../RouteSecure';

const OidcSecureCmpt = ({ children }: PropsWithChildren) => <>{children}</>;
const RouteSecureCmptMock = () => <RouteSecure OidcSecureCmpt={OidcSecureCmpt} />;

describe('<Routes />', () => {
  it.each`
    role          | title                | route
    ${'unknown'}  | ${TITLE_HOME}        | ${ROUTE_URLS.HOME}
    ${'unknown'}  | ${TITLE_UNAUTHORIZE} | ${ROUTE_URLS.UNAUTHORIZE}
    ${'unknown'}  | ${TITLE_NOTFOUND}    | ${ROUTE_URLS.NOTFOUND}
    ${PROFILS[0]} | ${TITLE_DEMOS}       | ${ROUTE_URLS.DEMOS}
  `('Should render page for unprotected routes, role: $role, title: $title, route: $route', async ({ role, title, route }) => {
    render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });
    act(() => {
      screen.getByText('Chargement de la page...');
    });
    await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it.each`
    role          | title      | route
    ${PROFILS[0]} | ${TITLE_P} | ${ROUTE_URLS.PROTECTEDPAGE}
  `(
    'Should render page for protected routes when user profil is authorize, role: $role, title: $title, route: $route',
    async ({ role, title, route }) => {
      render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });
      act(() => {
        screen.getByText('Chargement de la page...');
      });
      await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
    },
  );

  it.each`
    role         | title              | route
    ${'unknown'} | ${'403 Forbidden'} | ${ROUTE_URLS.PROTECTEDPAGE}
  `(
    'Should redirect to unauthorized page when user profil is not authorize, role: $role, title: $title, route: $route',
    async ({ role, title, route }) => {
      render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });

      await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
    },
  );
});
