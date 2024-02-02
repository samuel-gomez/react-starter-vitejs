import Layout, { type TLayoutPage } from 'Layout';
import { TITLE, TITLE_BAR } from './constants';

export type TProtectedPage = TLayoutPage;

const ProtectedPage = ({ titleBar = TITLE_BAR, title = TITLE }: TProtectedPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h2 className="af-title--content">{title}</h2>
    <p>Exemple de page accessible par authentification</p>
  </Layout>
);

export default ProtectedPage;
