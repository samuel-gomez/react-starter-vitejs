import Layout, { type TLayoutPage } from 'Layout';
import { TITLE, TITLE_BAR } from './constants';

export type THome = TLayoutPage;

const Home = ({ titleBar = TITLE_BAR, title = TITLE }: THome) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
  </Layout>
);

export default Home;
