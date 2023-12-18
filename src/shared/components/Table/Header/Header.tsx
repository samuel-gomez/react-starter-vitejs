import { HelpInfo, Table as TableTk } from '@axa-fr/react-toolkit-all';
import type { ReactNode } from 'react';
import Th, { TTh } from './Th';

type Theaders = {
  label: string;
  key: string;
  field?: string;
  infobulle?: ReactNode;
};

export type THeader = TTh & {
  headers?: Theaders[];
  children?: ReactNode;
};

const Header = ({ headers = [], onSort, sorting, children }: THeader) => (
  <TableTk.Header className="af-table__thead">
    <TableTk.Tr>
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
