import vsDark from 'prism-react-renderer/themes/vsDark';
import React from 'react';
import { LiveProviderProps, LiveProvider, LiveError, LivePreview } from 'react-live';
import * as reactTookitAll from 'shared/toolkit';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';
import TabsLiveCode from './TabsLiveCode';
import Accessibility from './Accessibility';
import Code from './Code';
import ReadMe from './ReadMe';
import './Livecode.scss';

type TLiveCode = {
  code: string;
  githubPackage?: string;
  scope: LiveProviderProps['scope'];
  theme?: LiveProviderProps['theme'];
  className?: string;
  onChange?: (arg: string) => void;
  styleLiveEditor?: React.CSSProperties;
  styleLivePreview?: React.CSSProperties;
  hideCode?: boolean;
  hideAccessibility?: boolean;
  hideReadme?: boolean;
};

const styleLivePreviewDefault = { background: 'white', padding: '2rem', width: '100%' } as const;
const ariaLabel = 'af-accessibility' as const;

const LiveCode = withClassNameModifier(
  ({
    code,
    scope,
    githubPackage,
    className,
    styleLivePreview = {},
    theme = vsDark,
    hideCode = false,
    hideAccessibility = false,
    hideReadme = false,
  }: TLiveCode) => (
    <article className={className}>
      <LiveProvider theme={theme} code={`<>${code}</>`} scope={{ ...reactTookitAll, ...scope }}>
        <LivePreview aria-label={ariaLabel} style={{ ...styleLivePreviewDefault, ...styleLivePreview }} />
        <LiveError />
      </LiveProvider>
      <TabsLiveCode>
        <Code key="code" hideComponent={hideCode} title="Code" icon="copyright-mark" theme={theme} code={code} />
        <Accessibility key="accessibility" hideComponent={hideAccessibility} code={code} title="AccessibilitÃ©" icon="font" ariaLabel={ariaLabel} />
        <ReadMe key="readme" hideComponent={hideReadme} title="Readme" icon="book" githubPackage={githubPackage} />
      </TabsLiveCode>
    </article>
  ),
  'af-livecode',
);

export default LiveCode;
