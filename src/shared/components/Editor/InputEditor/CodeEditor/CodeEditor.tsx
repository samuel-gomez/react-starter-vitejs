/* eslint-disable react/no-unused-prop-types */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ReactCodeEditor from '@uiw/react-textarea-code-editor/esm/index';
import Button from '@axa-fr/react-toolkit-button/dist/esm/index';
import Modal from '@axa-fr/react-toolkit-modal-default/dist/esm/index';
import type { ClickEvent } from '@axa-fr/react-toolkit-core/dist/esm/index';
import { ModalCommonHeader, ModalCommonBody, ModalCommonFooter, useToggleModal } from 'shared/components/ModalCommon';
import '@uiw/react-textarea-code-editor/dist.css';
import type { TEvent, TonChange } from '../../Editor';
import './CodeEditor.scss';
import Templates, { Tlistelements } from './Templates';

export const getPathTemplate = (temlateName = 'add-text') => `../../../../../templates/${temlateName}.js`;

export const getTemplate = (temlateName = 'add-text', getPathTemplateFn = getPathTemplate) => import(getPathTemplateFn(temlateName));

const INITIAL_STATE = { name: '', hasSubmit: false };

type TuseCodeEditor = TEvent & {
  onChange: TonChange;
  getTemplateFn?: typeof getTemplate;
  initialState?: typeof INITIAL_STATE;
};

export const useCodeEditor = ({ value, id, name, onChange, initialState = INITIAL_STATE, getTemplateFn = getTemplate }: TuseCodeEditor) => {
  const [code, setCode] = useState(value);
  const [template, setTemplate] = useState(initialState);

  const submitTemplate = useCallback((evn: ClickEvent) => {
    setTemplate({ name: evn?.id ?? '', hasSubmit: true });
  }, []);

  const onChangeCodeEditor = useCallback(
    (evn: ChangeEvent<HTMLTextAreaElement>) => {
      setTemplate(prevState => ({ ...prevState, hasSubmit: false }));
      onChange({ value: evn.target.value, name, id });
      setCode(evn.target.value);
    },
    [id, name, onChange],
  );

  const onAddTemplateEditor = useCallback(
    (evn: ChangeEvent<HTMLTextAreaElement>) => {
      setTemplate(prevState => ({ ...prevState, hasSubmit: false }));
      setCode(prevState => `${prevState}${evn.target.value}`);
      onChange({ value: `${code}${evn.target.value}`, name, id });
    },
    [code, id, name, onChange],
  );

  const onClearCodeEditor = useCallback(() => {
    setTemplate(INITIAL_STATE);
    setCode('');
    onChange({ value: '', name, id });
  }, [id, name, onChange]);

  useEffect(() => {
    if (template.name !== '' && template.hasSubmit) {
      const [filename, module = 'default'] = template.name.split('__');
      getTemplateFn(filename)
        .then(templateResponse => onAddTemplateEditor({ target: { value: `\n${templateResponse[module]}` } } as ChangeEvent<HTMLTextAreaElement>))
        .catch(error => setCode(error));
    }
  }, [getTemplateFn, onAddTemplateEditor, template]);

  return { onChangeCodeEditor, code, submitTemplate, onClearCodeEditor, template, onAddTemplateEditor };
};

export type TReturnUseCodeEditor = ReturnType<typeof useCodeEditor>;

type TCodeEditor = TuseCodeEditor & {
  useCodeEditorFn?: typeof useCodeEditor;
  useToggleModalFn?: typeof useToggleModal;
  list?: Tlistelements;
  labelBtnOpenCodeEditor?: string;
};
const CodeEditor = ({
  value,
  onChange,
  name,
  id,
  list,
  labelBtnOpenCodeEditor = 'Edit children',
  useCodeEditorFn = useCodeEditor,
  useToggleModalFn = useToggleModal,
}: TCodeEditor) => {
  const { code, onChangeCodeEditor, submitTemplate, onClearCodeEditor } = useCodeEditorFn({ value, onChange, name, id });
  const { onCancel, openModal, isOpen } = useToggleModalFn();
  return (
    <>
      <Button classModifier="editor" type="submit" onClick={openModal}>
        <span className="af-btn__text">{labelBtnOpenCodeEditor}</span>
      </Button>
      <Modal isOpen={isOpen} onOutsideTap={onCancel} className="af-modal af-modal--editor">
        <ModalCommonHeader onCancel={onCancel} title={`Saisir la value de ${name}`} />
        <ModalCommonBody>
          <Templates list={list} submitTemplate={submitTemplate} onClearCodeEditor={onClearCodeEditor} />
          <ReactCodeEditor
            aria-label="Jsx Code Editor Input"
            value={code}
            language="jsx"
            placeholder="Please enter JSX code."
            onChange={onChangeCodeEditor}
            padding={15}
            style={{
              fontSize: 12,
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              minHeight: '200px',
            }}
          />
        </ModalCommonBody>
        <ModalCommonFooter cancelLabel="Fermer" onCancel={onCancel} />
      </Modal>
    </>
  );
};

export default CodeEditor;
