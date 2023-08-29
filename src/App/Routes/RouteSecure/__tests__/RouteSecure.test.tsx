import { describe, it, expect, vi } from 'vitest';
import { render, screen } from 'shared/testsUtils/customRender';
import { AuthorizedProfile } from '../RouteSecure';

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
