import { createId } from '@axa-fr/react-toolkit-core';
import { Highlight, Prism as defautProps } from 'prism-react-renderer/dist/index';
import { LiveProvider } from 'react-live';

import ClipBoard from '../ClipBoard';

type LiveProviderProps = Parameters<typeof LiveProvider>[0];

type TCode = {
  hideComponent?: boolean;
  title?: string;
  icon?: string;
  theme: LiveProviderProps['theme'];
  code: string;
};

const ariaLabel = 'af-accessibility-code' as const;

const Code = ({ theme, code }: TCode) => (
  <Highlight {...defautProps} theme={theme} code={code} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <>
        <ClipBoard content={code} />
        <pre aria-label={ariaLabel} className={className} style={{ ...style, padding: '1rem', fontSize: '0.8rem', position: 'relative' }}>
          {tokens.map((line, i) => {
            const keyLine = createId();
            return (
              <div key={keyLine} {...getLineProps({ line, key: keyLine })}>
                <span className="token-line__number">{i + 1}</span>
                <span className="token-line__content">
                  {line.map(token => {
                    const key = createId();
                    return <span key={key} {...getTokenProps({ token, key })} />;
                  })}
                </span>
              </div>
            );
          })}
        </pre>
      </>
    )}
  </Highlight>
);

export default Code;
