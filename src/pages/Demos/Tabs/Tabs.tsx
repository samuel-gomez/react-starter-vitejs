import Layout, { type TLayoutPage } from 'Layout';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

const INITIAL_STATE = {
  labelFirstTab: '<i className="glyphicon glyphicon-briefcase" /> Title with left icon',
  labelSecondTab: '<i className="glyphicon glyphicon-user" /> Title with right icon',
  labelThirdTab: 'Title with badge <Badge classModifier="info"> 21 </Badge>',
  contentFirstTab: 'Content first tab',
  contentSecondTab: 'Content second tab',
  contentThirdTab: 'Content third tab',
  classModifierFirstTab: 'has-icon-left',
  classModifierSecondTab: 'has-icon-right',
  className: 'af-tabs',
  activeIndex: '1',
};

type Props = Partial<typeof INITIAL_STATE> & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onChangeTab: (arg: string) => void;
};

const code = ({
  labelFirstTab,
  labelSecondTab,
  labelThirdTab,
  contentFirstTab,
  contentSecondTab,
  contentThirdTab,
  className,
  classModifierFirstTab,
  classModifierSecondTab,
  activeIndex,
}: Props) => `
    <Tabs className="${className}" onChange={onChangeTab} activeIndex="${activeIndex}">
        <Tabs.Tab title={<>${labelFirstTab}</>} classModifier="${classModifierFirstTab}">
            ${contentFirstTab}
        </Tabs.Tab>
        <Tabs.Tab title={<>${labelSecondTab}</>} classModifier="${classModifierSecondTab}" >
            ${contentSecondTab}
        </Tabs.Tab>
        <Tabs.Tab title={<>${labelThirdTab}</>}>
            ${contentThirdTab}
        </Tabs.Tab>
    </Tabs>
  `;

const TabsWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

export const onChangeTabFn = (key: string, onChangeFn: (key: string) => (e: TEvent) => void) => (e: string) => onChangeFn(key)({ value: e });

const TabsEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });
  return <TabsWithEditor {...state} onChange={onChange} onChangeTab={onChangeTabFn('activeIndex', onChange)} />;
};

type TTabsPage = TLayoutPage;

const TabsDemo = ({ titleBar = TITLE_BAR, title = TITLE }: TTabsPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <TabsEditable />
  </Layout>
);

export default TabsDemo;
