import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import Body, { type TBody } from './Body';
import Header, { type THeader } from './Header';

export type TTable = THeader &
  TBody & {
    childrenHeader?: ReactNode;
    className?: string;
  } & ComponentPropsWithoutRef<typeof TableTk>;

const Table = ({ onSort, sorting, headers, items, childrenHeader, ...rest }: TTable) => (
  <TableTk {...rest}>
    <Header headers={headers} onSort={onSort} sorting={sorting}>
      {childrenHeader}
    </Header>
    <Body items={items} />
  </TableTk>
);

export default Table;
