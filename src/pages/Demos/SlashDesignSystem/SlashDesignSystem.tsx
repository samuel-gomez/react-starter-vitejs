import Layout, { type TLayoutPage } from 'Layout';
import Cards from 'shared/components/Cards';
import COMPONENTS, { TITLE, TITLE_BAR } from './constants';

export type TSlashDesignSystemPage = TLayoutPage & {
  components?: typeof COMPONENTS;
};

const SlashDesignSystemPage = ({ titleBar = TITLE_BAR, title = TITLE, components = COMPONENTS }: TSlashDesignSystemPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <Cards items={components} />
  </Layout>
);

export default SlashDesignSystemPage;
