import Layout, { TLayoutPage } from 'Layout';
import { TITLE_BAR, TITLE } from './constants';

export type TProtectedPage = TLayoutPage;

const ProtectedPage = ({ titleBar = TITLE_BAR, title = TITLE }: TProtectedPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <p>Exemple de page accessible par authentification</p>
  </Layout>
);

export default ProtectedPage;
