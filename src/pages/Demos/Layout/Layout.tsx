import type { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import { useToggleModal } from 'shared/components/ModalCommon';
import type { TEvent } from 'shared/types.d';
import './Layout.scss';
import knobs from './knobs.json';

const INITIAL_STATE = {
  className: 'af-main',
  classModifier: '',
  children: `
  <h2 className="af-title--content">Layout playground</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sunt repudiandae corporis expedita illo minima, aut nostrum vitae. Fuga quo
    facilis dolorum fugit? Cumque necessitatibus unde nostrum possimus voluptas nisi.
  </p>
`,
  fullScreen: false,
  disabledHeader: false,
  disabledMenu: false,
  disabledFooter: false,
  disabledTitle: false,
  titleBar: 'Layout demo',
};

type Props = Omit<typeof INITIAL_STATE, 'icon'> & {
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({ fullScreen, titleBar, children, className, classModifier, disabledHeader, disabledMenu, disabledTitle, disabledFooter }: Props) => `
<Layout fullScreen={${fullScreen}} propsTitle={{ title: '${titleBar}' }} disabled={{ header: ${disabledHeader}, menu: ${disabledMenu}, title: ${disabledTitle}, footer: ${disabledFooter} }} className="${className}" classModifier="${classModifier}" >
  ${children}
</Layout> 
`;

const LayoutWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => {
    const modalProps = useToggleModal();
    return (
      <>
        <EditorHeader openEditor={openEditor} />
        <LiveCode
          styleLivePreview={{ padding: '0' }}
          classModifier="layout"
          code={code(props)}
          scope={{
            Layout,
            modalProps,
            ...props,
          }}
          hideReadme
        />
      </>
    );
  },
  knobs as unknown as Tknobs,
);

const LayoutEditable = () => {
  const { state, onChange, onClick } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <LayoutWithEditor {...state} onClick={onClick('onClick démo Layout')} onChange={onChange} />;
};

export default LayoutEditable;
