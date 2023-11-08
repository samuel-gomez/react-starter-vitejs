import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { HeaderApp as Header, HeaderInfo } from '../Header';

const defaultProps = {
  title: "titre de l'application",
  subtitle: "Sous titre de l'application",
  infos: [],
  anomaly: null,
};

const checkContent = () => {
  const header = screen.getByRole('banner');
  expect(header).toBeDefined();
  const headerScope = within(header);

  expect(headerScope.getByText(/\[Profil\]/i)).toBeInTheDocument();
  expect(headerScope.getByText(/Non Connecté/i)).toBeInTheDocument();
  expect(headerScope.getByAltText(/titre de l'application/)).toBeInTheDocument();
  expect(headerScope.getByRole('heading', { level: 2, name: RegExp(defaultProps.title) })).toBeInTheDocument();
  expect(headerScope.getByText(defaultProps.subtitle)).toBeInTheDocument();
  return header;
};

describe('<Header/>', () => {
  it('Render <Header/>', async () => {
    const { container } = render(<Header {...defaultProps} />);
    checkContent();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Render <Header/> fullscreen', () => {
    render(<Header {...defaultProps} fullScreen />);
    const header = checkContent();
    expect(header.closest('.af-header')).toHaveClass('af-header--fullscreen');
  });

  it('Should contain <Infos /> with "mydefinition" text when infos equal [{ word: "word", definition: "mydefinition" }]', () => {
    render(<Header {...defaultProps} infos={[{ word: 'word', definition: 'mydefinition' }]} />);
    expect(screen.getByText('mydefinition')).toBeDefined();
  });

  it.each`
    authName     | authRole     | expectedName      | expectedRole
    ${'FDS'}     | ${'ADMIN'}   | ${'FDS'}          | ${'ADMIN'}
    ${undefined} | ${undefined} | ${'Non Connecté'} | ${'Profil'}
    ${undefined} | ${''}        | ${'Non Connecté'} | ${'inconnu'}
  `(
    'Should contain <User /> with expectedName: $expectedName, expectedRole: $expectedRole when authName= $authName, authRole= $authRole ',
    ({ authName, authRole, expectedName, expectedRole }) => {
      render(<Header {...defaultProps} authName={authName} authRole={authRole} />);
      expect(screen.getByText(RegExp(expectedName))).toBeDefined();
      expect(screen.getByText(RegExp(expectedRole))).toBeDefined();
    },
  );
});

describe('<HeaderInfo/>', () => {
  const Custom = () => <span>Mon composant</span>;

  it('Should contain Skeleton when isLoader false', () => {
    render(
      <HeaderInfo>
        <Custom />
      </HeaderInfo>,
    );
    expect(screen.getByRole('alert')).toBeDefined();
  });

  it('Should contain Custom when isLoader true', () => {
    render(
      <HeaderInfo isLoaded>
        <Custom />
      </HeaderInfo>,
    );
    expect(screen.getByText('Mon composant')).toBeDefined();
  });
});
