import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import { type ReactNode } from 'react';
import Header, { type THeader } from './Header';
import { type TTh } from './Header/Th';

export type THeaders = TTh & {
  headers?: THeader[];
  children?: ReactNode;
};

const Headers = ({ headers = [], onSort, sorting, children }: THeaders) => (
  <TableTk.Header className="af-table__thead">
    <TableTk.Tr>
      <>
        {!!headers.length && headers.map(({ label, key, ...rest }) => <Header key={key} label={label} onSort={onSort} sorting={sorting} {...rest} />)}
        {children}
      </>
    </TableTk.Tr>
  </TableTk.Header>
);

export default Headers;
