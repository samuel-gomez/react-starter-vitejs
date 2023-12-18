import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Body, { type TBody } from './Body';
import Header, { type THeader } from './Header';
import { DEFAULT_TABLE_ITEMS_TYPE } from './constants';

export type TTable = THeader &
  TBody & {
    childrenHeader?: ReactNode;
    className?: string;
    title: string;
    itemsType?: string;
    isCaptionVisible?: boolean;
  } & ComponentPropsWithoutRef<typeof TableTk>;

const Table = ({
  onSort,
  sorting,
  headers,
  title,
  items,
  childrenHeader,
  itemsType = DEFAULT_TABLE_ITEMS_TYPE,
  isCaptionVisible = true,
  ...rest
}: TTable) => (
  <TableTk {...rest}>
    <caption className={isCaptionVisible ? '' : 'sr-only'}>{title}</caption>
    <Header headers={headers} onSort={onSort} sorting={sorting} itemsType={itemsType}>
      {childrenHeader}
    </Header>
    <Body items={items} itemsType={itemsType} />
  </TableTk>
);

export default Table;
