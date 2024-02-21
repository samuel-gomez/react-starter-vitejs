import { PopoverModes, PopoverPlacements } from '@axa-fr/react-toolkit-all';
import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  label: 'My label',
  mode: PopoverModes.click,
  placement: PopoverPlacements.right,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({ label, mode, placement }: Props) => `<HelpButton mode="${mode}" placement="${placement}">${label}</HelpButton>`;

const HelpWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader storybookPath={STORYBOOK_PATH} githubPackage={GITHUB_PACKAGE} npmName={NPM_NAME} openEditor={openEditor} />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const HelpEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <HelpWithEditor {...state} onChange={onChange} />;
};

type THelpPage = TLayoutPage;

const HelpPage = ({ titleBar = TITLE_BAR, title = TITLE }: THelpPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <HelpEditable />
  </Layout>
);

export default HelpPage;
