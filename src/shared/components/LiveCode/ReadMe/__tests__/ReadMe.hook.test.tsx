import { waitFor } from '@testing-library/dom';
import { customRenderHook } from 'shared/testsUtils';
import { useGithubReadme } from '../ReadMe.hook';

describe('useGithubReadme', () => {
  it('Render useGithubReadme with only githubPackage', async () => {
    const { result } = customRenderHook({ queryData: 'test markdown' })(() => useGithubReadme({ githubPackage: 'test' }), {});
    await waitFor(() => expect(result.current.markdownContent).toEqual('test markdown'));
  });
});
