import { type PropsWithChildren } from 'react';
import { act, render, screen, waitFor } from 'shared/testsUtils/customRender';

import { TITLE as TITLE_HOME } from 'pages/Home';
import { TITLE as TITLE_NOTFOUND } from 'pages/NotFound';
import { TITLE as TITLE_UNAUTHORIZE } from 'pages/Unauthorize';
import { PROFILS } from 'shared/constants';
import Routes, { ROUTE_URLS } from '..';
import { RouteSecure } from '../RouteSecure';

const OidcSecureCmpt = ({ children }: PropsWithChildren) => <>{children}</>;
const RouteSecureCmptMock = () => <RouteSecure OidcSecureCmpt={OidcSecureCmpt} />;

describe('<Routes />', () => {
  it.each`
    role          | title                | route
    ${PROFILS[0]} | ${TITLE_HOME}        | ${ROUTE_URLS.HOME}
    ${'unknown'}  | ${TITLE_UNAUTHORIZE} | ${ROUTE_URLS.UNAUTHORIZE}
    ${'unknown'}  | ${TITLE_NOTFOUND}    | ${ROUTE_URLS.NOTFOUND}
  `('Should render page routes, role: $role, title: $title, route: $route', async ({ role, title, route }) => {
    render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });
    act(() => {
      screen.getByText('Chargement de la page...');
    });
    await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it.each`
    role         | title                | route
    ${'unknown'} | ${TITLE_UNAUTHORIZE} | ${ROUTE_URLS.HOME}
  `('Should redirect to unauthorize page for protected routes, role: $role, title: $title, route: $route', async ({ role, title, route }) => {
    render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });

    await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
  });
});
