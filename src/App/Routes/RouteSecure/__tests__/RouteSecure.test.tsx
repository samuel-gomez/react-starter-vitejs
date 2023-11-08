import type { PropsWithChildren } from 'react';
import { render, screen } from 'shared/testsUtils/customRender';
import RouteSecure, { AuthorizedProfile } from '../RouteSecure';

describe('<AuthorizedProfile />', () => {
  const OutletCmpt = () => <p>private component</p>;
  const NavigateCmpt = vi.fn().mockReturnValue(null);

  const defaultProps = {
    OutletCmpt,
    NavigateCmpt,
  };

  it('Render <AuthorizedProfile/> when user is null', () => {
    render(<AuthorizedProfile {...defaultProps} />, {}, { oidcUser: null });
    const chargementText = screen.getByText('Chargement des données utilisateur...');
    expect(chargementText).toBeInTheDocument();
  });

  it('Render <AuthorizedProfile/> when user is unauthorized', () => {
    render(<AuthorizedProfile {...defaultProps} />, {}, { role: 'unknown ole' });
    expect(NavigateCmpt).toHaveBeenCalled();
  });

  it('Render <AuthorizedProfile/> when user is authorized', () => {
    render(<AuthorizedProfile {...defaultProps} />);
    const privateText = screen.getByText('private component');
    expect(privateText).toBeInTheDocument();
  });
});

describe('<RouteSecure />', () => {
  const AuthorizedProfileCmpt = () => <span>private component</span>;
  const OidcSecureCmpt = ({ children }: PropsWithChildren) => <p>With Oidc Secure : {children}</p>;

  const defaultProps = {
    OidcSecureCmpt,
    AuthorizedProfileCmpt,
  };

  it('Render <RouteSecure/> with OidcSecure when isEnabled true', () => {
    render(<RouteSecure {...defaultProps} />);
    const oidcSecure = screen.getByText('With Oidc Secure :');
    const privateComponent = screen.getByText('private component');
    expect(oidcSecure).toBeInTheDocument();
    expect(privateComponent).toBeInTheDocument();
  });

  it('Render <RouteSecure/> without OidcSecure when isEnabled false', () => {
    render(<RouteSecure {...defaultProps} />, {}, { isEnabled: false });
    const privateComponent = screen.getByText('private component');
    expect(privateComponent).toBeInTheDocument();
  });
});
