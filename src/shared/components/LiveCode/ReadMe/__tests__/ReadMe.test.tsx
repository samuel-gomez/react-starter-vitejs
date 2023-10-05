import { render, screen } from 'shared/testsUtils';
import ReadMe, { CodeMarkdown, regexLanguage } from '../ReadMe';

describe('<ReadMe />', () => {
  it('Render <ReadMe /> with markdownContent, isFetching, error, refetch', () => {
    render(<ReadMe markdownContent="test" isFetching={false} error={null} refetch={vi.fn()} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});

describe('CodeMarkdown', () => {
  const childrenMock = ['const Button = () => <SimpleButton>Lorem Ipsum</SimpleButton>;\nexport default Button;\n'];

  it('Render codeMarkdown with inline undefined', () => {
    render(<CodeMarkdown className="language-javascript">{childrenMock}</CodeMarkdown>);
    const copyButton = screen.getByText('Copied !');
    expect(copyButton).toBeInTheDocument();
    expect(copyButton.closest('.prism-code.language-jsx')).toBeInTheDocument();
  });

  it('Render codeMarkdown with inline true', () => {
    render(<CodeMarkdown inline>{childrenMock}</CodeMarkdown>);
    expect(screen.getByText(/export default Button/)).toBeInTheDocument();
  });
});

describe('regexLanguage', () => {
  it('Should return an array with javascript language', () => {
    const result = regexLanguage('language-javascript');
    expect(result?.length).toEqual(2);
  });

  it('Should return null when className is undefined', () => {
    const result = regexLanguage(undefined);
    expect(result).toEqual(null);
  });
});
