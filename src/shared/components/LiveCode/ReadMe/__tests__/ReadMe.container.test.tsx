import { render, screen } from 'shared/testsUtils';
import ReadMeContainer from '../ReadMe.container';

const useGithubReadmeFn = vi.fn();
useGithubReadmeFn.mockReturnValue({
  markdownContent: 'test',
  isFetching: false,
  error: false,
  refetch: () => ({}),
});

describe('<ReadMeContainer />', () => {
  it('Render <ReadMeContainer /> with githubPackage, useGithubReadmeFn', () => {
    render(<ReadMeContainer githubPackage="test" useGithubReadmeFn={useGithubReadmeFn} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
