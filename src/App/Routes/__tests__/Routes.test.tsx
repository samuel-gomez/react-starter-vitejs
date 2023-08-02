import { describe, it, expect } from 'vitest';
import { PropsWithChildren } from 'react';
import { render, screen, waitFor, act } from 'shared/testsUtils/customRender';

import { PROFILS } from 'shared/constants';
import { TITLE as TITLE_HOME } from 'pages/Home';
import { TITLE as TITLE_DEMOS } from 'pages/Demos/SlashDesignSystem';
import { TITLE as TITLE_NOTFOUND } from 'pages/NotFound';
import { TITLE as TITLE_UNAUTHORIZE } from 'pages/Unauthorize';
import Routes, { ROUTE_URLS } from '..';
import { RouteSecure } from '../RouteSecure';

const OidcSecureCmpt = ({ children }: PropsWithChildren) => <>{children}</>;
const RouteSecureCmptMock = () => <RouteSecure OidcSecureCmpt={OidcSecureCmpt} />;

describe('<Routes />', () => {
  it.each`
    role         | title                | route
    ${'unknown'} | ${TITLE_HOME}        | ${ROUTE_URLS.HOME}
    ${'unknown'} | ${TITLE_UNAUTHORIZE} | ${ROUTE_URLS.UNAUTHORIZE}
    ${'unknown'} | ${TITLE_NOTFOUND}    | ${ROUTE_URLS.NOTFOUND}
  `('Should render page for unprotected routes, role: $role, title: $title, route: $route', async ({ role, title, route }) => {
    render(<Routes RouteSecureCmpt={RouteSecureCmptMock} />, {}, { role, route });
    act(() => {
      screen.getByText('Chargement de la page...');
    });
    await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it.each`
    role          | title          | route
    ${PROFILS[0]} | ${TITLE_DEMOS} | ${ROUTE_URLS.DEMOS}
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
});

/* describe('<Routes />', () => {
  it.each`
    role  | name        | route
    ${''} | ${'Samuel'} | ${'/'}
    ${''} | ${'Samuel'} | ${'/forbidden'}
  `('Should render page when user profil is authorized, role: $role, name: $name, route: $route', ({ role, name, route }) => {
    const { asFragment } = renderRoute({ role, name, route });
    expect(asFragment()).toMatchSnapshot();
  });

  it.each`
    role                   | name     | route
    ${'user unauthorized'} | ${'sam'} | ${'/'}
  `('Should render forbidden page when user profil is unauthorized, role: $role, name: $name, route: $route', ({ role, name, route }) => {
    const UserContextObjMock = createContext<TUserContext>({ authName: '', authRole: role, authUid: '', isEnabled: true, isLoading: false });
    const { getByText } = renderRoute({
      role,
      name,
      route,
      defaultProps: { ...defaultPropsMock, withAuthFn: (...args: ComponentType<object>[]) => withAuth(args[0], UserContextObjMock, ['admin']) },
    });
    expect(getByText('PageUnauthorizeCmpt')).toBeInTheDocument();
  });

  it.each`
    route
    ${'/no-exist-route'}
  `('Should render 404 when route: $route is not correct', async ({ route }) => {
    const { getByText } = renderRoute({ route, role: '', name: 'samuel' });
    await act(() => {
      getByText('Chargement de la page...');
    });

    await waitFor(() => expect(getByText('404')).toBeInTheDocument());
  });
}); */

/* 
describe('Render withAuth', () => {
  const Component = () => <p>component</p>;
  it.each`
    authRole | authName
    ${''}    | ${'Samuel'}
  `('Should render RouteCmpt when user profile is authorized (authRole, authName)', ({ authRole, authName }) => {
    const UserContextObjMock = createContext<TUserContext>({ authRole, authName, authUid: '', isEnabled: true, isLoading: false });
    const { getByText } = renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock));
    expect(getByText('component')).toBeInTheDocument();
  });

  it('Should render NavigateCmpt when user profile is unauthorized', () => {
    const UserContextObjMock = createContext<TUserContext>({
      authName: '',
      authRole: 'unauthorized',
      authUid: '',
      isEnabled: true,
      isLoading: false,
    });
    const NavigateCmpt = vi.fn().mockReturnValue(null);
    renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock, [''], NavigateCmpt));
    expect(NavigateCmpt).toHaveBeenCalled();
  });

  it('Should render LoaderCmpt when user profile is loading', () => {
    const LoaderCmpt = vi.fn();
    const UserContextObjMock = createContext<TUserContext>({ authName: '', authRole: '', authUid: '', isEnabled: true, isLoading: true });
    const NavigateCmpt = vi.fn().mockReturnValue(null);
    renderWithWrapperStaticRouter(withAuth(Component, UserContextObjMock, [''], NavigateCmpt, LoaderCmpt));
    expect(LoaderCmpt).toHaveBeenCalled();
  });
}); */
