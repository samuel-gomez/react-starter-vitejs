import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import './TitleBar.scss';
import { GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: 'custom-width',
  content: 'Custom right content',
  title: 'Demo Titlebar',
  subtitle: 'Sous titre',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({
  title,
  subtitle,
  content,
  classModifier,
}: Props) => `<HeaderTitle classModifier="${classModifier}" title="${title}" subtitle="${subtitle}">
    ${content}
</HeaderTitle>`;

const TitleBarWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader storybookPath={STORYBOOK_PATH} githubPackage={GITHUB_PACKAGE} npmName={NPM_NAME} openEditor={openEditor} />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const TitleBarEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <TitleBarWithEditor {...state} onChange={onChange} />;
};

type TTitleBarPage = TLayoutPage;

const TitleBarPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTitleBarPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <TitleBarEditable />
  </Layout>
);

export default TitleBarPage;
