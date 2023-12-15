import type { ReactNode } from 'react';
import { Table as TableTk, HelpInfo } from '@axa-fr/react-toolkit-all';
import Th, { TTh } from './Th';
import { DEFAULT_TABLE_ITEMS_TYPE } from '../constants';

type Theaders = {
  label: string;
  key: string;
  field?: string;
  infobulle?: ReactNode;
};

export type THeader = TTh & {
  headers?: Theaders[];
  children?: ReactNode;
  itemsType?: string;
};

const Header = ({ headers = [], onSort, sorting, children, itemsType = DEFAULT_TABLE_ITEMS_TYPE }: THeader) => (
  <TableTk.Header className="af-table__thead" aria-label={`En-tête du tableau de ${itemsType}`}>
    <TableTk.Tr aria-label={`Ligne de l'en-tête du tableau de ${itemsType}`}>
      <>
        {!!headers.length &&
          headers.map(({ field, label, key, infobulle }) => (
            <Th key={key} scope="col" sorting={sorting} field={field} onSort={onSort}>
              <HelpInfo content={infobulle}>
                <span className="af-table__th-label">{label}</span>
              </HelpInfo>
            </Th>
          ))}
        {children}
      </>
    </TableTk.Tr>
  </TableTk.Header>
);

export default Header;
