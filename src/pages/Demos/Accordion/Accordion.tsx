import type { ClickEvent } from '@axa-fr/react-toolkit-core';
import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  classModifier: '',
  className: '',
  onlyOne: true,
  header1: 'Header 1',
  header2: 'Header 2',
  header3: 'Header 3',
  content1: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
  Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
  soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
  content2: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
  Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
  soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
  content3: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
  Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
  soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
};

type Props = Partial<typeof INITIAL_STATE> & {
  onClick?: (arg: ClickEvent) => void;
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
};

const code = ({ classModifier, className, onlyOne, header1, header2, header3, content1, content2, content3 }: Props) => `
    <Accordion
      classModifier="${classModifier}"
      className="${className}"
      onlyOne={${onlyOne}} id="test">

      <CollapseCard onToggle={onClick} id="id1">
        <CollapseCard.Header>
          ${header1}
        </CollapseCard.Header>
        <CollapseCard.Body>
          ${content1}
        </CollapseCard.Body>
      </CollapseCard>

      <CollapseCard onToggle={onClick} id="id2">
        <CollapseCard.Header>
          ${header2}
        </CollapseCard.Header>
        <CollapseCard.Body>
          ${content2}
        </CollapseCard.Body>
      </CollapseCard>

      <CollapseCard onToggle={onClick} id="id3">
        <CollapseCard.Header>
          ${header3}
        </CollapseCard.Header>
        <CollapseCard.Body>
          ${content3}
        </CollapseCard.Body>
      </CollapseCard>

    </Accordion>
`;

const AccordionWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
  ({ openEditor, ...props }) => (
    <>
      <EditorHeader
        storybookPath={STORYBOOK_PATH}
        designSystemPath={DESIGN_SYSTEM_PATH}
        githubPackage={GITHUB_PACKAGE}
        npmName={NPM_NAME}
        openEditor={openEditor}
      />
      <LiveCode styleLivePreview={{ textAlign: 'left' }} code={code(props)} githubPackage={GITHUB_PACKAGE} scope={props} />
    </>
  ),
  knobs as unknown as Tknobs,
);

const AccordionEditable = () => {
  const { state, onChange, onClick } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <AccordionWithEditor {...state} onClick={onClick('onClick Accordion')} onChange={onChange} />;
};

type TAccordionPage = TLayoutPage;

const AccordionDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TAccordionPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <AccordionEditable />
  </Layout>
);

export default AccordionDemo;
