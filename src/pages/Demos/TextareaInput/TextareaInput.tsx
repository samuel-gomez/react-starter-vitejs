import { MessageTypes } from '@axa-fr/react-toolkit-all';
import Layout, { type TLayoutPage } from 'Layout';
import isEqual from 'lodash/isEqual';
import { memo, type FocusEvent } from 'react';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  id: 'uniquetextareaid',
  name: 'name-field-textarea',
  className: 'row af-form__group',
  classModifier: 'required',
  value: 'my value in textarea',
  label: 'My Label for textarea',
  placeholder: 'Ex: your description',
  helpMessage: 'Enter your text',
  rows: 6,
  cols: 60,
  message: '',
  forceDisplayMessage: false,
  messageType: MessageTypes.error,
  disabled: false,
  autoFocus: true,
  readOnly: false,
  required: false,
  classNameContainerInput: 'col-md-10',
  classNameContainerLabel: 'col-md-2',
  helpButton: false,
  isVisible: true,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onBlur?: (arg: TEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onFocus?: (arg: FocusEvent<HTMLInputElement>) => void;
};

const code = ({
  label,
  classModifier,
  className,
  helpButton,
  disabled,
  id,
  value,
  helpMessage,
  name,
  placeholder,
  messageType,
  message,
  readOnly,
  isVisible,
  forceDisplayMessage,
  rows,
  cols,
  autoFocus,
  required,
}: Props) => `<TextareaInput required={${required}} 
  forceDisplayMessage={${forceDisplayMessage}} 
  disabled={${disabled}} 
  id="${id}" 
  message="${message}" 
  placeholder="${placeholder}" 
  helpMessage="${helpMessage}" 
  name="${name}" 
  value="${value}" 
  label={<>${label}</>}
  className="${className}" 
  classModifier="${classModifier}"  
  messageType="${messageType}" 
  onChange={onChange('value')} 
  autoComplete="none"
  onBlur={onBlur} 
  onFocus={onFocus} 
  autoFocus={${autoFocus}} 
  readOnly={${readOnly}} 
  isVisible={${isVisible}}
  rows={${rows}}
  cols={${cols}} >
  ${helpButton ? `<HelpButton>tooltip avec du text</HelpButton>` : ''}
</TextareaInput>  
`;

const TextareaInputWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const MemoizedTextareaInputWithEditor = memo(TextareaInputWithEditor, (prev: Props, next: Props) => isEqual(prev, next));

const TextareaInputEditable = () => {
  const { state, onChange, onBlur, onFocus } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <MemoizedTextareaInputWithEditor {...state} onBlur={onBlur} onFocus={onFocus} onChange={onChange} />;
};

type TTextareaInputPage = TLayoutPage;

const TextareaInputPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTextareaInputPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <TextareaInputEditable />
  </Layout>
);

export default TextareaInputPage;
