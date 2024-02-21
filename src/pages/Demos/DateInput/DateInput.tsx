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
  classModifier: 'required',
  className: 'row af-form__group',
  label: 'My Label',
  value: new Date(2022, 11, 7),
  helpMessage: 'Enter the date',
  placeholder: 'Ex: 14/12/2022',
  message: '',
  messageType: MessageTypes.error,
  forceDisplayMessage: false,
  autoFocus: true,
  disabled: false,
  required: false,
  readOnly: false,
  isVisible: true,
  classNameContainerLabel: 'col-md-2',
  classNameContainerInput: 'col-md-10',
  helpButton: false,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({
  label,
  className,
  classModifier,
  disabled,
  helpButton,
  id,
  name,
  helpMessage,
  placeholder,
  message,
  messageType,
  readOnly,
  forceDisplayMessage,
  isVisible,
  required,
  autoFocus,
  classNameContainerLabel,
  classNameContainerInput,
}: Props) => `<DateInput required={${required}} 
  forceDisplayMessage={${forceDisplayMessage}} 
  disabled={${disabled}} 
  id="${id}" 
  message="${message}" 
  placeholder="${placeholder}" 
  helpMessage="${helpMessage}" 
  name="${name}" 
  value={value}
  label={<>${label}</>}
  className="${className}" 
  classModifier="${classModifier}" 
  messageType="${messageType}" 
  onChange={onChange('value')} 
  autoComplete="none"
  autoFocus={${autoFocus}} 
  readOnly={${readOnly}} 
  isVisible={${isVisible}} 
  classNameContainerLabel="${classNameContainerLabel}"
  classNameContainerInput="${classNameContainerInput}"
  >
  ${helpButton ? `<HelpButton>tooltip avec du text</HelpButton>` : ''}
</DateInput>  
`;

const DateInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode classModifier="with-editor" code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const DateInputEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <DateInputWithEditor {...state} onChange={onChange} />;
};

type TDateInputPage = TLayoutPage;

const DateInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TDateInputPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <DateInputEditable />
  </Layout>
);

export default DateInputPage;
