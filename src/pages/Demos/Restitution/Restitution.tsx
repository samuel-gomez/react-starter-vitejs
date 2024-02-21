import type { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  children: `<ArticleRestitution>
  <HeaderRestitution
  title="Tarif"
  subtitle="Tout adhérent, assuré, base (sans EAC ou sans PAC)"
  rightTitle={<a
    className="af-link af-link--hasIconLeft"
    href="#"
    onClick={onClick}>
    <i className="glyphicon glyphicon-pencil" />
    <span className="af-link__text">Modifier</span>
  </a>}
  /><SectionRestitution>
  <SectionRestitutionRow title="Base de calcul des prestations">
    <SectionRestitutionColumn>
      <Restitution label="TA">99,99 %</Restitution>
      <Restitution label="EURO">EURO</Restitution>
      <Restitution label="TT">100,00 %</Restitution>
    </SectionRestitutionColumn>
  </SectionRestitutionRow>
 </SectionRestitution>
</ArticleRestitution>`,
};

type Props = typeof INITIAL_STATE & {
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({ children }: Props) => children;

const RestitutionWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        openEditor={openEditor}
        npmName={NPM_NAME}
      />
      <LiveCode code={code(props)} scope={props} githubPackage={GITHUB_PACKAGE} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const RestitutionEditable = () => {
  const { state, onClick, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <RestitutionWithEditor {...state} onClick={onClick('onClick démo Restitution')} onChange={onChange} />;
};

type TRestitutionPage = TLayoutPage;

const RestitutionPage = ({ titleBar = TITLE_BAR, title = TITLE }: TRestitutionPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <RestitutionEditable />
  </Layout>
);

export default RestitutionPage;
