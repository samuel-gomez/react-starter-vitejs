import type { ReactNode } from 'react';
import { Table as TableTk, HelpInfo } from '@axa-fr/react-toolkit-all';
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
  ariaLabel?: string;
  ariaLabelLine?: string;
};

const Header = ({ headers = [], onSort, sorting, children, ariaLabel = 'table-header', ariaLabelLine = 'table-header-line' }: THeader) => (
  <TableTk.Header className="af-table__thead" aria-label={ariaLabel}>
    <TableTk.Tr aria-label={ariaLabelLine}>
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
