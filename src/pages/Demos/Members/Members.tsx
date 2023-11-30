import { Paging } from '@axa-fr/react-toolkit-all';
import Resilience from 'shared/components/Resilience';
import Layout, { type TLayoutPage } from 'Layout';
import { Tanomaly } from 'shared/types';
import Loader, { type TLoader } from 'shared/components/Loader';
import Table from 'shared/components/Table';
import { TITLE_BAR, TITLE, TABLE_HEADERS_MEMBERS } from './constants';
import type { TReturnUseMembers } from './Members.hook';

export type TMembers = TLayoutPage & {
  loaderMode: TLoader['mode'];
  refetch: TReturnUseMembers['refetch'];
  pagination: TReturnUseMembers['pagination'];
  onChangePaging: TReturnUseMembers['onChangePaging'];
  onChangeSorting: TReturnUseMembers['onChangeSorting'];
  sorting: TReturnUseMembers['sorting'];
  members: TReturnUseMembers['members'];
  anomaly: Tanomaly | null;
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
    <h1 className="af-title--content">{title}</h1>
    <Loader mode={loaderMode}>
      <Resilience anomaly={anomaly} refetch={refetch as React.MouseEventHandler<HTMLButtonElement>}>
        <Table items={members} headers={headers} onSort={onChangeSorting} sorting={sorting} aria-label={`Tableau ${title}`} />
        <Paging {...pagination} onChange={onChangePaging} id="paging" />
      </Resilience>
    </Loader>
  </Layout>
);

export default Members;
