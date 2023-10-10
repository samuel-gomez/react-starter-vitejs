import { CodeMarkdown } from './ReadMe';
import { TReturnUseGithubReadme } from './ReadMe.hook';

export type TReadMe = {
  markdownContent: TReturnUseGithubReadme['markdownContent'];
  isFetching: TReturnUseGithubReadme['isFetching'];
  error: TReturnUseGithubReadme['error'];
  refetch: TReturnUseGithubReadme['refetch'];
  CodeMarkdownFn?: typeof CodeMarkdown;
};

export type THighlightWrapper = {
  className: string;
  style: object;
  child: React.ReactNode;
  getLineProps: (input: LineInputProps) => LineOutputProps;
  getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  tokens: Token[][];
};

export type LineInputProps = {
  key?: React.Key;
  style?: CSSProperties;
  className?: string;
  line: Token[];
};

export type TokenOutputProps = {
  key?: React.Key;
  style?: CSSProperties;
  className: string;
  children: string;
};

export type TokenInputProps = {
  key?: React.Key;
  style?: CSSProperties;
  className?: string;
  token: Token;
};

export type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

export type LineOutputProps = {
  key?: React.Key;
  style?: CSSProperties;
  className: string;
};
