import { Paging } from '@axa-fr/react-toolkit-all';
import Layout, { type TLayoutPage } from 'Layout';
import Loader, { type TLoader } from 'shared/components/Loader';
import Resilience from 'shared/components/Resilience';
import Table from 'shared/components/Table';
import type { Tanomaly } from 'shared/types.d';
import type { TReturnUseMembers } from './Members.hook';
import { TABLE_HEADERS_MEMBERS, TABLE_ITEMS_TYPE, TITLE, TITLE_BAR } from './constants';

export type TMembers = TLayoutPage & {
  loaderMode: TLoader['mode'];
  refetch: TReturnUseMembers['refetch'];
  pagination: TReturnUseMembers['pagination'];
  onChangePaging: TReturnUseMembers['onChangePaging'];
  onChangeSorting: TReturnUseMembers['onChangeSorting'];
  sorting: TReturnUseMembers['sorting'];
  members: TReturnUseMembers['members'];
  anomaly: Tanomaly | null;
  title?: string;
  headers?: typeof TABLE_HEADERS_MEMBERS;
};

const Members = ({
  loaderMode,
  refetch,
  anomaly,
  pagination,
  onChangePaging,
  members,
  onChangeSorting,
  sorting,
  titleBar = TITLE_BAR,
  title = TITLE,
  headers = TABLE_HEADERS_MEMBERS,
}: TMembers) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h2 className="af-title--content">{title}</h2>
    <Loader mode={loaderMode}>
      <Resilience anomaly={anomaly} refetch={refetch as React.MouseEventHandler<HTMLButtonElement>}>
        <Table title={title} items={members} itemsType={TABLE_ITEMS_TYPE} headers={headers} onSort={onChangeSorting} sorting={sorting} />
        <Paging {...pagination} onChange={onChangePaging} id="paging" />
      </Resilience>
    </Loader>
  </Layout>
);

export default Members;
