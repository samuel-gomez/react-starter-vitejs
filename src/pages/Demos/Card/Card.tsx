import Layout, { type TLayoutPage } from 'Layout';
import { type ReactNode } from 'react';
import { EditorHeader, useEditable, withEditor, type TReturnUseToggleEditor, type Tknobs } from 'shared/components/Editor';
import LiveCode from 'shared/components/LiveCode';
import type { TEvent } from 'shared/types.d';
import { DESIGN_SYSTEM_PATH, GITHUB_PACKAGE, NPM_NAME, STORYBOOK_PATH, TITLE, TITLE_BAR } from './constants';
import knobs from './knobs.json';

type TState = {
  type: 'checkbox' | 'radio';
  title: string;
  checkboxValues: string[];
  radioValue: string;
  cards: {
    name: string;
    id: string;
    value: string;
    title: string;
    subtitle: string;
    content: ReactNode;
    footer: string;
  }[];
};

const INITIAL_STATE: TState = {
  type: 'checkbox',
  title: 'Franchisés standard',
  checkboxValues: ['1'],
  radioValue: '1',
  cards: [
    {
      name: 'card-1',
      id: '1',
      value: '1',
      title: 'Référence',
      subtitle: '50 € / month',
      content: `<dl>
        <dt className="af-rccard__term"> Status: </dt>
        <dd className="af-rccard__def"> In progress </dd>
        <dt className="af-rccard__term"> Savings reached: </dt>
        <dd className="af-rccard__def"> 125 000 € </dd>
      </dl>`,
      footer: 'Sortie en rente obligatoire',
    },
    {
      name: 'card-2',
      id: '2',
      value: '2',
      title: 'Référence',
      subtitle: '250 € / month',
      content: `<dl>
        <dt className="af-rccard__term"> Status: </dt>
        <dd className="af-rccard__def"> In progress </dd>
        <dt className="af-rccard__term"> Savings reached: </dt>
        <dd className="af-rccard__def"> 85 000 € </dd>
      </dl>`,
      footer: 'Sortie en rente obligatoire',
    },
  ],
};

type Props = TState & {
  onChange: (name: keyof typeof INITIAL_STATE) => (arg: TEvent) => void;
  onChangeCard: (arg: TEvent) => void;
};

const code = ({ type, title, checkboxValues, radioValue, cards }: Props) => `${
  type === 'checkbox' ? `<CardGroupCheckbox values={${JSON.stringify(checkboxValues)}}` : `<CardGroupRadio value="${radioValue}"`
}
  title="${title}"
  onChange={onChangeCard}
>
${cards
  .map(
    card =>
      `  <Card key="${card.id}" name="${card.name}" id="${card.id}" value="${card.value}">
    <CardHeader type="radio">
      <p className="af-rccard-header__title">${card.title}</p>
      <p className="af-rccard-header__subtitle">${card.subtitle}</p>
    </CardHeader>
    <CardContent>
      ${card.content}
    </CardContent>
    <CardFooter>
      <p>${card.footer}</p>
    </CardFooter>
  </Card>`,
  )
  .join('\n')}
${type === 'checkbox' ? '</CardGroupCheckbox>' : '</CardGroupRadio>'}`;

const CardWithEditor = withEditor<Props & Partial<TReturnUseToggleEditor>>(
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

const CardEditable = () => {
  const { state, onChange } = useEditable<typeof INITIAL_STATE>({ initialState: INITIAL_STATE });

  return <CardWithEditor {...state} onChange={onChange} onChangeCard={onChange(state.type === 'checkbox' ? 'checkboxValues' : 'radioValue')} />;
};

type TTabsPage = TLayoutPage;

const CardPage = ({ titleBar = TITLE_BAR, title = TITLE }: TTabsPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <CardEditable />
  </Layout>
);

export default CardPage;
