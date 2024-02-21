import { useQuery } from '@tanstack/react-query';
import { API_URL, GITHUB_API } from 'shared/constants';
import type { Tanomaly } from 'shared/types.d';

type TuseGithubReadme = {
  githubPackage?: string;
  useQueryFn?: typeof useQuery;
};

export const useGithubReadme = ({ githubPackage, useQueryFn = useQuery }: TuseGithubReadme) => {
  const { data, isFetching, error, refetch } = useQueryFn<unknown, Tanomaly>({
    queryKey: [`${GITHUB_API}${githubPackage}/README.md`, { text: true }, API_URL.GITHUB],
    staleTime: 10000,
  });

  return { markdownContent: data, isFetching, error, refetch };
};

export type TReturnUseGithubReadme = ReturnType<typeof useGithubReadme>;
