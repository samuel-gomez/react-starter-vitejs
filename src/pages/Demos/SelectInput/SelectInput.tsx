import { MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  name: 'name-field',
  id: 'uniqueid',
  options: [
    { label: 'For fun', value: 'fun', id: 'fun' },
    { label: 'For work', value: 'work', id: 'work' },
    { label: 'For drink', value: 'drink', id: 'drink' },
  ],
  mode: 'default',
  placeholder: '- Select -',
  forceDisplayPlaceholder: false,
  classModifier: '',
  className: '',
  label: 'My Label Select',
  value: '',
  helpMessage: 'Enter your name',
  message: '',
  messageType: MessageTypes.error,
  forceDisplayMessage: false,
  disabled: false,
  isVisible: true,
  classNameContainerLabel: 'col-md-2',
  classNameContainerInput: 'col-md-10',
  helpButton: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onChangeSelect: (arg: TEvent) => void;
};

const code = ({
  label,
  className,
  classModifier,
  disabled,
  helpButton,
  value,
  id,
  options,
  mode,
  name,
  helpMessage,
  message,
  messageType,
  forceDisplayMessage,
  isVisible,
  placeholder,
  forceDisplayPlaceholder,
  classNameContainerLabel,
  classNameContainerInput,
}: Props) => `<SelectInput
  label={<>${label}</>}
  name="${name}"
  id="${id}"
  options={${JSON.stringify(options)}}
  onChange={onChangeSelect}
  mode="${mode}"
  value="${value}"
  helpMessage="${helpMessage}"
  message="${message}" 
  messageType="${messageType}"
  forceDisplayMessage={${forceDisplayMessage}}
  disabled={${disabled}} 
  isVisible={${isVisible}}
  classModifier="${classModifier}"
  className="${className}"
  placeholder="${placeholder}"
  forceDisplayPlaceholder={${forceDisplayPlaceholder}}
  classNameContainerLabel="${classNameContainerLabel}"
  classNameContainerInput="${classNameContainerInput}"
>
  ${helpButton ? `<HelpButton>Hello Select</HelpButton>` : ''}
</SelectInput>
`;

const SelectInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

const SelectInputEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <SelectInputWithEditor {...state} onChange={onChange} onChangeSelect={onChange('value')} />;
};

type TTabsPage = TLayoutPage;

const SelectInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTabsPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <SelectInputEditable />
  </Layout>
);

export default SelectInputPage;
