import Layout, { type TLayoutPage } from 'Layout';
import { useQuery } from '@tanstack/react-query';
import type { Tanomaly } from 'shared/types';
import Table, { setDisplay } from 'shared/components/Table';
import Loader, { type TLoader, setLoaderMode } from 'shared/components/Loader';
import Resilience from 'shared/components/Resilience';
import { setAnomalyEmptyItems, setDate } from 'shared/helpers';
import { TITLE_BAR, TITLE, TABLE_HEADERS_PEOPLE, SERVICE_NAME, ENDPOINT } from './constants';
import PeopleDetail from './PeopleDetail';

export type TPeopleData = Record<string, string>;

export type TPeopleDataResponse = {
  responseBody: TPeopleData[];
};

export const computeInfos = (data: TPeopleData[]) =>
  data?.map(({ _id, firstname, lastname, birthDate, entity, photo }) => ({
    key: _id,
    cols: {
      ...setDisplay({ firstname }),
      ...setDisplay({ lastname }),
      ...setDisplay({ birthDate: setDate({ date: birthDate }) }),
      ...setDisplay({ entity }),
      actions: {
        classModifier: 'actions',
        children: <PeopleDetail id={_id} entity={entity} photo={photo} firstname={firstname} lastname={lastname} />,
      },
    },
  }));

export const usePeople = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [ENDPOINT],
    select: ({ responseBody }: TPeopleDataResponse) => ({
      anomaly: setAnomalyEmptyItems(responseBody),
      [SERVICE_NAME]: computeInfos(responseBody),
    }),
  });

  return {
    ...data,
    anomaly: (error || data?.anomaly) as Tanomaly | null,
    isLoading,
    refetch,
  };
};

export type TReturnUsePeople = ReturnType<typeof usePeople>;

export type TPeople = TLayoutPage &
  Pick<TReturnUsePeople, 'people' | 'anomaly' | 'refetch'> & {
    loaderMode: TLoader['mode'];
    headers?: typeof TABLE_HEADERS_PEOPLE;
  };

const People = ({ titleBar = TITLE_BAR, title = TITLE, people, headers = TABLE_HEADERS_PEOPLE, refetch, loaderMode, anomaly }: TPeople) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h1 className="af-title--content">{title}</h1>
    <Loader mode={loaderMode}>
      <Resilience anomaly={anomaly} refetch={refetch as React.MouseEventHandler<HTMLButtonElement>}>
        <Table items={people} headers={headers} aria-label={`${title}`} />
      </Resilience>
    </Loader>
  </Layout>
);

const PeopleContainer = () => {
  const { anomaly, isLoading, people, refetch } = usePeople();
  return <People people={people} loaderMode={setLoaderMode({ isLoading })} refetch={refetch} anomaly={anomaly} />;
};

export default PeopleContainer;
