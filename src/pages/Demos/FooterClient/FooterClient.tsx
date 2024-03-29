import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  languages: [
    {
      name: 'English',
      value: 'en',
    },
    {
      name: 'Chinese',
      value: 'cn',
    },
  ],
  currentLanguage: 'en',
  socialNetworkList: {
    facebook: '#',
    linkedin: '#',
    youtube: '#',
    instagram: '#',
    twitter: '#',
  },
  copyright: 'Policy Privacy © 2022 AXA All Rights Reserved',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({ languages, currentLanguage, socialNetworkList, copyright }: Props) => `
  <FooterClient
    bottomComponent={<LanguageSelection languages={${JSON.stringify(languages)}} currentLanguage="${currentLanguage}" />}
    copyright="${copyright}">
    <FooterClientList title="Languages" >
      <FooterClientItem path="/">
        Languages
      </FooterClientItem>
      <FooterClientItem path="/">
        Young driver insurance
      </FooterClientItem>
      <FooterClientItem path="/">
        Home insurance
      </FooterClientItem>
    </FooterClientList>
    <FooterClientList title="Axa & You" >
      <FooterClientItem path="/">
        Call us
      </FooterClientItem>
      <FooterClientItem path="/">
        Policy documents
      </FooterClientItem>
    </FooterClientList>
    <FooterClientList title="Useful links" >
      <FooterClientItem path="/">
        About us
      </FooterClientItem>
      <FooterClientItem path="/">
        Careers
      </FooterClientItem>
      <FooterClientItem path="/">
        Blog
      </FooterClientItem>
    </FooterClientList>
    <FooterClientList title="Follow AXA">
      <SocialNetwork list={${JSON.stringify(socialNetworkList)}} />
    </FooterClientList>
  </FooterClient>
`;

const FooterClientWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode styleLivePreview={{ textAlign: 'left' }} code={code(props)} githubPackage={GITHUB_PACKAGE} scope={props} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const FooterClientEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <FooterClientWithEditor {...state} onChange={onChange} />;
};

type TFooterPage = TLayoutPage;

const FooterClientDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TFooterPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <FooterClientEditable />
  </Layout>
);

export default FooterClientDemo;
