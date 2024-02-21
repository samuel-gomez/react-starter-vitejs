import type { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { type TLayoutPage } from 'Layout';
import type { ReactNode } from 'react';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: 'danger',
  className: 'af-alert',
  icon: '',
  title: 'Attention : des informations sont manquantes',
  children: '<p>hello child</p>',
  toggleOnCloseProps: true,
};

type Props = Omit<typeof INITIAL_STATE, 'icon' | 'children' | 'toggleOnCloseProps'> & {
  icon?: string;
  children?: ReactNode;
  toggleOnCloseProps?: boolean;
  onClose?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({ title, className, classModifier, icon = '', children = '', toggleOnCloseProps }: Props) =>
  `<Alert title="${title}" icon="${icon}" className="${className}" classModifier="${classModifier}" type="submit" onClose={${
    toggleOnCloseProps ? 'onClose' : null
  }} >
  ${children}
</Alert>`;

const AlertWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

const AlertEditable = () => {
  const { state, onClick, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <AlertWithEditor {...state} onClose={onClick('onClose Alert')} onChange={onChange} />;
};

type TAlertPage = TLayoutPage;

const AlertPage = ({ titleBar = TITLE_BAR, title = TITLE }: TAlertPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <AlertEditable />
  </Layout>
);

export default AlertPage;
