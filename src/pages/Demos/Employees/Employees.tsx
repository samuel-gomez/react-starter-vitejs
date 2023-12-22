import Layout, { type TLayoutPage } from 'Layout';
import Table from 'shared/components/Table';
import { type TItems } from 'shared/components/Table/Body/Body';
import { TABLE_DATA, TABLE_HEADERS, TABLE_ITEMS_TYPE, TITLE, TITLE_BAR } from './constants';

export type TRequests = TLayoutPage & {
  requests?: TItems[];
  title?: string;
  headers?: typeof TABLE_HEADERS;
};

const Employees = ({ requests = TABLE_DATA, titleBar = TITLE_BAR, title = TITLE, headers = TABLE_HEADERS }: TRequests) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h1 className="af-title--content">{title}</h1>
    <Table title={title} items={requests} headers={headers} itemsType={TABLE_ITEMS_TYPE} />
  </Layout>
);

export default Employees;
