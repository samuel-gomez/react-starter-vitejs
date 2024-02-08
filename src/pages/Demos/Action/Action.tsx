import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types';
import { GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: '',
  icon: 'link',
  title: 'Demo title',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({ title, icon, classModifier }: Props) => `<Action classModifier="${classModifier}" icon="${icon}" title="${title}" />`;

const ActionWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader storybookPath={STORYBOOK_PATH} githubPackage={GITHUB_PACKAGE} npmName={NPM_NAME} openEditor={openEditor} />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const ActionEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <ActionWithEditor {...state} onChange={onChange} />;
};

type TActionPage = TLayoutPage;

const ActionPage = ({ titleBar = TITLE_BAR, title = TITLE }: TActionPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <ActionEditable />
  </Layout>
);

export default ActionPage;
