import { CheckboxModes, MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  id: 'uniqueid',
  name: 'name-field',
  options: [
    { label: 'Euro', value: 'euro', id: 'euro' },
    { label: 'Dollar', value: 'dollar', id: 'dollar' },
    { label: 'Yen', value: 'yen', id: 'yen' },
    { label: 'Franc', value: 'franc', id: 'franc', disabled: true },
  ],
  mode: CheckboxModes.default,
  classModifier: '',
  className: '',
  label: 'Monies',
  values: ['euro', 'yen'],
  helpMessage: 'Choose your monies',
  messageType: MessageTypes.error,
  message: '',
  forceDisplayMessage: false,
  readOnly: false,
  disabled: false,
  isVisible: true,
  classNameContainerInput: 'col-md-10',
  classNameContainerLabel: 'col-md-2',
  helpButton: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onChangeCheckbox: (arg: TEvent) => void;
};

const code = ({
  label,
  classModifier,
  className,
  helpButton,
  disabled,
  id,
  values,
  mode,
  options,
  name,
  message,
  helpMessage,
  messageType,
  forceDisplayMessage,
  readOnly,
  classNameContainerInput,
  classNameContainerLabel,
  isVisible,
}: Props) => `
  <CheckboxInput
    label={<>${label}</>}
    name="${name}"
    id="${id}"
    options={${JSON.stringify(options)}}
    onChange={onChangeCheckbox}
    mode="${mode}"
    values={${JSON.stringify(values)}}
    helpMessage="${helpMessage}"
    message="${message}" 
    messageType="${messageType}"
    forceDisplayMessage={${forceDisplayMessage}}
    readOnly={${readOnly}}
    disabled={${disabled}} 
    isVisible={${isVisible}}
    classModifier="${classModifier}"
    className="${className}"
    classNameContainerLabel="${classNameContainerLabel}"
    classNameContainerInput="${classNameContainerInput}">    
  </CheckboxInput>
  ${helpButton ? `<HelpButton>Hello Checkbox</HelpButton>` : ''}
`;

const CheckboxInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode styleLivePreview={{ textAlign: 'left' }} code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const CheckboxInputEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <CheckboxInputWithEditor {...state} onChange={onChange} onChangeCheckbox={onChange('values')} />;
};

type TTabsPage = TLayoutPage;

const CheckboxInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTabsPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <CheckboxInputEditable />
  </Layout>
);

export default CheckboxInputPage;
