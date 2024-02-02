import { Alert } from '@axa-fr/react-toolkit-all';
import Layout, { type TLayoutPage } from 'Layout';
import DownloadLink from 'shared/components/DownloadLink';
import Loader, { type TLoader } from 'shared/components/Loader';
import Resilience from 'shared/components/Resilience';
import Table from 'shared/components/Table';
import { formatDate } from 'shared/helpers/formatDate';
import SearchForm from './SearchForm';
import type { TReturnUseFormSearchMembers, TReturnUseSearchMembers } from './SearchMembers.hook';
import { SUBTITLE, TABLE_HEADERS_SEARCHMEMBERS, TABLE_ITEMS_TYPE, TITLE, TITLE_BAR } from './constants';

export const getDownloadPath = (memberId: string) => `members/${memberId}/download-detail`;

export const setFileName = ({ name = '', memberId = '', date = `${new Date()}`, prefix = 'prefix', extension = 'csv', formatDateFn = formatDate }) =>
  `${prefix}_${name.replace(/ /g, '_').trim()}_${memberId}_${formatDateFn(date, 'fr-CA').replace(/-/g, '')}.${extension}`;

type TDownloadLinkEnhanced = {
  idKey: string;
  firstname: string;
  lastname: string;
  getDownloadPathFn?: typeof getDownloadPath;
  setFileNameFn?: typeof setFileName;
};

export const DownloadLinkEnhanced = ({
  idKey,
  firstname,
  lastname,
  getDownloadPathFn = getDownloadPath,
  setFileNameFn = setFileName,
}: TDownloadLinkEnhanced) => (
  <DownloadLink path={getDownloadPathFn(idKey)} fileName={setFileNameFn({ memberId: idKey, name: `${firstname}-${lastname}` })} />
);

type TSearchMembers = TLayoutPage &
  Omit<TReturnUseSearchMembers, 'isLoading'> & {
    loaderMode: TLoader['mode'];
    submitFormSearchMembers: TReturnUseFormSearchMembers['submitFormSearchMembers'];
    title?: string;
  };

const SearchMembers = ({ titleBar = TITLE_BAR, title = TITLE, loaderMode, searchMembers, anomaly, submitFormSearchMembers }: TSearchMembers) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h2 className="af-title--content">{title}</h2>
    <Alert title="Des cas sont prévus sur la démo. Voici les valeurs à saisir :" classModifier="info">
      <ul>
        <li>Cas erreur 500 : saisir `500`</li>
        <li>Cas erreur 404 : saisir `404`</li>
        <li>Cas erreur 403 : saisir `403`</li>
        <li>Cas vide : saisir `vide`</li>
        <li>Cas valide : saisir `sam`</li>
      </ul>
    </Alert>
    <SearchForm submitFormSearchMembers={submitFormSearchMembers} />
    <Loader message="Recherche des membres en cours..." mode={loaderMode}>
      <Resilience anomaly={anomaly}>
        <h2 className="af-title">{SUBTITLE}</h2>
        <Table itemsType={TABLE_ITEMS_TYPE} title={title} items={searchMembers} headers={TABLE_HEADERS_SEARCHMEMBERS} />
      </Resilience>
    </Loader>
  </Layout>
);

export default SearchMembers;
