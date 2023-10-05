import { waitFor } from '@testing-library/dom';
import { customRenderHook, act } from 'shared/testsUtils';
import { useGithubReadme } from '../ReadMe.hook';

const useQueryFn = vi.fn();
useQueryFn.mockReturnValue({
  data: 'test',
  isFetching: false,
  error: false,
  refetch: () => ({}),
});

describe('useGithubReadme', () => {
  it('Render useGithubReadme with githubPackage, useGithubReadmeFn', () => {
    const { result } = customRenderHook()(() => useGithubReadme({ githubPackage: 'test', useQueryFn }));
    act(() => {
      expect(result.current.markdownContent).toEqual('test');
    });
  });

  it('Render useGithubReadme with only githubPackage', async () => {
    const { result } = customRenderHook({ queryData: 'test markdown' })(() => useGithubReadme({ githubPackage: 'test' }), {});
    await waitFor(() => expect(result.current.markdownContent).toEqual('test markdown'));
  });
});
