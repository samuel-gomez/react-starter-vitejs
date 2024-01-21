import { useQuery } from '@tanstack/react-query';
import Layout, { type TLayoutPage } from 'Layout';
import Loader, { TLoader, setLoaderMode } from 'shared/components/Loader';
import Resilience from 'shared/components/Resilience';
import Table, { setDisplay } from 'shared/components/Table';
import { setAnomalyEmptyItems, setDate } from 'shared/helpers';
import { type Tanomaly } from 'shared/types';
import { ENDPOINT, SERVICE_NAME, TABLE_HEADERS_PEOPLE, TITLE, TITLE_BAR } from './constants';

export type TPeopleData = Record<string, string>;

export type TPeopleDataResponse = {
  responseBody: TPeopleData[];
};

export const computeInfos = (data: TPeopleData[]) =>
  data?.map(({ _id, firstname, lastname, birthDate, entity }) => ({
    key: _id,
    cols: {
      ...setDisplay({ firstname }),
      ...setDisplay({ lastname }),
      ...setDisplay({ birthDate: setDate({ date: birthDate }) }),
      ...setDisplay({ entity }),
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
    <h2 className="af-title--content">{title}</h2>
    <Loader mode={loaderMode}>
      <Resilience anomaly={anomaly} refetch={refetch as React.MouseEventHandler<HTMLButtonElement>}>
        <Table title="Titre de mon tableau" items={people} headers={headers} itemsType="membres" />
      </Resilience>
    </Loader>
  </Layout>
);

const PeopleContainer = () => {
  const { anomaly, isLoading, people, refetch } = usePeople();
  return <People people={people} loaderMode={setLoaderMode({ isLoading })} refetch={refetch} anomaly={anomaly} />;
};

export default PeopleContainer;
