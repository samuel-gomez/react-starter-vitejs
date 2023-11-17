import { emptyFunction, render, screen } from 'shared/testsUtils';
import TitleBar from '../TitleBar';

const defaultProps = { title: 'titre barre', handleClick: emptyFunction };

const checkContent = (titleBarClass = '.af-title-bar') => {
  const title = screen.getByRole('heading', { level: 1, name: RegExp(defaultProps.title) });
  expect(title).toBeInTheDocument();
  const titleBar = title.closest(titleBarClass);
  return titleBar;
};

describe('<TitleBar/>', () => {
  it('Render <TitleBar />', async () => {
    render(<TitleBar {...defaultProps} />);
    checkContent();
    // fix axe violations on Toolkit
    // expect(await axe(container)).toHaveNoViolations();
  });

  it('Render <TitleBar /> with other classname and child', () => {
    render(
      <TitleBar {...defaultProps} className="other">
        <p>child for titlebar</p>
      </TitleBar>,
    );
    checkContent('other');
    expect(screen.getByText('child for titlebar')).toBeDefined();
  });

  it('Should contain back home <Link /> when backHome is true', () => {
    render(<TitleBar {...defaultProps} backHome />);
    checkContent();
    expect(screen.getByLabelText("Retour à l'accueil")).toBeDefined();
  });
});
