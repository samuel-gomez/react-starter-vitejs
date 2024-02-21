import type { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import buttonKnobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: '',
  className: 'af-btn',
  label: 'valider',
  id: 'uniqueid',
  disabled: false,
  icon: '',
};

type Props = Omit<typeof INITIAL_STATE, 'icon'> & {
  icon?: string;
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({
  label,
  className,
  classModifier,
  disabled,
  id,
  icon = '',
}: Props) => `<Button id="${id}" disabled={${disabled}} className="${className}" classModifier="${classModifier}" onClick={onClick} >
    ${
      icon !== '' ? `<i role="img" aria-label="${icon}" className="glyphicon glyphicon-${icon}"></i>` : ''
    }<span className="af-btn__text">${label}</span>
</Button>`;

const ButtonWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode styleLivePreview={{ display: 'flex', placeContent: 'center' }} code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  buttonKnobs as unknown as Tknobs,
);

const ButtonEditable = () => {
  const { state, onClick, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <ButtonWithEditor {...state} onClick={onClick('onClick button')} onChange={onChange} />;
};

type TButtonPage = TLayoutPage;

const ButtonPage = ({ titleBar = TITLE_BAR, title = TITLE }: TButtonPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <ButtonEditable />
  </Layout>
);

export default ButtonPage;
