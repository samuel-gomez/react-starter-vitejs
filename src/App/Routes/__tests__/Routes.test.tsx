import { describe, it, expect, vi } from 'vitest';
import { ComponentType, createContext } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserProvider from 'App/UserProvider';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { TUserContext } from 'App/UserProvider/UserProvider';
import Routes, { withAuth } from '..';

const defaultPropsMock = {
  HomeCmpt: () => <div>HomeCmpt</div>,
  PageUnauthorizeCmpt: () => <div>PageUnauthorizeCmpt</div>,
};

type TrenderRoute = {
  role?: string;
  name?: string;
  route?: string;
  defaultProps?: object;
};

const renderRoute = ({ role = '', name = '', route = '/', defaultProps = defaultPropsMock }: TrenderRoute) => {
  const useOidcUser = vi.fn().mockReturnValue({
    oidcUser: { name, member_of: [`CN=${role}`] },
  });

  return render(
    <MemoryRouter initialEntries={[route]}>
      <UserProvider useOidcUserFn={useOidcUser} isEnabled>
        <Routes {...defaultProps} />
      </UserProvider>
    </MemoryRouter>,
  );
};

describe('<Routes />', () => {
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
  `('Should render 404 when election route: $route is not correct', ({ route }) => {
    const { getByText } = renderRoute({ route, role: '', name: 'samuel' });
    expect(getByText('404')).toBeInTheDocument();
  });
});

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
});
