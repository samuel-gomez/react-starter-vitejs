import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Body, { type TBody } from './Body';
import Header, { type THeader } from './Header';

export type TTable = THeader &
  TBody & {
    childrenHeader?: ReactNode;
    className?: string;
    title: string;
    isCaptionVisible?: boolean;
  } & ComponentPropsWithoutRef<typeof TableTk>;

const Table = ({ onSort, sorting, headers, title, items, childrenHeader, isCaptionVisible = true, ...rest }: TTable) => (
  <TableTk {...rest}>
    <caption className={isCaptionVisible ? '' : 'sr-only'}>{title}</caption>
    <Header headers={headers} onSort={onSort} sorting={sorting}>
      {childrenHeader}
    </Header>
    <Body items={items} />
  </TableTk>
);

export default Table;
