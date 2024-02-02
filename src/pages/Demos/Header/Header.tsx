import Layout, { type TLayoutPage } from 'Layout';
import logo from 'assets/slash-logo.svg';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types';
import './Header.scss';
import { GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: 'custom-width',
  title: 'Toolkit React Starter',
  alt: 'Toolkit React Starter',
  subtitle: 'by Slash Design System',
  infos: [{ word: 'Portefeuille :', definition: '000123456789' }],
  name: 'Bob Smith',
  link: 'link',
  profile: 'Public',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({ classModifier, title, alt, subtitle, infos, name, link, profile }: Props) => `<Header classModifier="${classModifier}">
  <Name title="${title}" img="${logo}" alt="${alt}" subtitle="${subtitle}" />
  <Infos infos={${JSON.stringify(infos)}} />
  <User name="${name}" href="${link}" profile="${profile}" />
</Header>`;

const HeaderWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader storybookPath={STORYBOOK_PATH} githubPackage={GITHUB_PACKAGE} npmName={NPM_NAME} openEditor={openEditor} />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const HeaderEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <HeaderWithEditor {...state} onChange={onChange} />;
};

type THeaderPage = TLayoutPage;

const HeaderPage = ({ titleBar = TITLE_BAR, title = TITLE }: THeaderPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <HeaderEditable />
  </Layout>
);

export default HeaderPage;
