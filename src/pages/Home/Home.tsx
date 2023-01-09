import Layout, { TLayoutPage } from 'Layout';
import { TITLE_BAR, TITLE } from './constants';
import Galleries from './Galleries';

export type THome = TLayoutPage;

const Home = ({ titleBar = TITLE_BAR, title = TITLE }: THome) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <Galleries />
  </Layout>
);

export default Home;
