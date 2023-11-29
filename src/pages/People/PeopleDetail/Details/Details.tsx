import { ArticleRestitution, HeaderRestitution, SectionRestitution, SectionRestitutionRow, Restitution } from '@axa-fr/react-toolkit-all';
import { useQuery } from '@tanstack/react-query';
import type { Tanomaly } from 'shared/types';
import Loader, { setLoaderMode } from 'shared/components/Loader';
import Resilience from 'shared/components/Resilience';
import { setDate } from 'shared/helpers';
import { ENDPOINT, SERVICE_NAME, STALE_TIME } from './constants';

export type TPeopleDetailData = { clientId?: string; contractNumber: string; date: string; agencyName: string; address: string; phone: string };

export type TPeopleDetailDataResponse = {
  responseBody: TPeopleDetailData;
};

export const usePeopleDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`${ENDPOINT}/${id}`],
    select: ({ responseBody }: TPeopleDetailDataResponse) => ({
      [SERVICE_NAME]: responseBody,
    }),
    staleTime: STALE_TIME,
  });

  return {
    ...data,
    anomaly: error as Tanomaly | null,
    isLoading,
    refetch,
  };
};

export type TReturnUsePeopleDetail = ReturnType<typeof usePeopleDetail>;

const Details = ({ id }: { id: string }) => {
  const {
    anomaly,
    isLoading,
    peopleDetail = { contractNumber: '', date: '', agencyName: '', address: '', phone: '' },
    refetch,
  } = usePeopleDetail({ id });
  const { contractNumber, date, agencyName, address, phone } = peopleDetail;
  return (
    <Loader mode={setLoaderMode({ isLoading })}>
      <Resilience anomaly={anomaly} refetch={refetch as React.MouseEventHandler<HTMLButtonElement>}>
        <ArticleRestitution>
          <HeaderRestitution title="Détail du contrat" />
          <SectionRestitution>
            <SectionRestitutionRow>
              <Restitution label="Numéro de contrat">{contractNumber}</Restitution>
              <Restitution label="Date de souscription">{setDate({ date })}</Restitution>
              <Restitution label="Agence">{agencyName}</Restitution>
              <Restitution label="Adresse de l'agence">{address}</Restitution>
              <Restitution label="Téléphone de l'agence">{phone}</Restitution>
            </SectionRestitutionRow>
          </SectionRestitution>
        </ArticleRestitution>
      </Resilience>
    </Loader>
  );
};

export default Details;
