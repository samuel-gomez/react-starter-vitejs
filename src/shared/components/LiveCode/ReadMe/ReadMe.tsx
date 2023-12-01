import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Highlight, Prism as defautProps } from 'prism-react-renderer/dist/index';
import { createId } from '@axa-fr/react-toolkit-core';
import 'github-markdown-css/github-markdown-light.css';
import Resilience from 'shared/components/Resilience';
import type { ReactNode } from 'react';
import Loader, { setLoaderMode } from 'shared/components/Loader';
import ClipBoard from '../ClipBoard';
import type { THighlightWrapper, Token, TReadMe } from './ReadMe.type';
import styleHighlight from './constants';
import './ReadMe.scss';

export const regexLanguage = (className: string | undefined) => /language-(\w+)/.exec(className || '');

const HighlightWrapper = ({ className, style, child, getLineProps, getTokenProps, tokens }: THighlightWrapper) => (
  <pre className={className} style={{ ...style, ...styleHighlight }}>
    <ClipBoard content={String(child).replace(/\n$/, '')} />
    {tokens.map((line: Token[], i: number) => {
      const keyLine = createId();
      return (
        <div key={keyLine} {...getLineProps({ line, key: keyLine })}>
          <span className="token-line__number">{i + 1}</span>
          <span className="token-line__content">
            {line.map((token: Token) => {
              const key = createId();
              return <span key={key} {...getTokenProps({ token, key })} />;
            })}
          </span>
        </div>
      );
    })}
  </pre>
);

export type TCodeMarkdown = {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
};
export const CodeMarkdown = ({ inline, className, children }: TCodeMarkdown) => {
  const match = regexLanguage(className);
  return !inline && match ? (
    <Highlight {...defautProps} code={String(children).replace(/\n$/, '')} language="jsx">
      {({ className: classNameChild, style, tokens, getLineProps, getTokenProps }) => (
        <HighlightWrapper
          className={classNameChild}
          style={style}
          child={children}
          getLineProps={getLineProps}
          getTokenProps={getTokenProps}
          tokens={tokens}
        />
      )}
    </Highlight>
  ) : (
    <>{children}</>
  );
};

const ReadMe = ({ markdownContent, isFetching, error, refetch, CodeMarkdownFn = CodeMarkdown }: TReadMe) => (
  <Loader mode={setLoaderMode({ isLoading: isFetching })}>
    <Resilience anomaly={error} refetch={refetch as React.MouseEventHandler<HTMLButtonElement>}>
      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            code: CodeMarkdownFn,
          }}
        >
          {markdownContent as string}
        </ReactMarkdown>
      </div>
    </Resilience>
  </Loader>
);

export default ReadMe;
