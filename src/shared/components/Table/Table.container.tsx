import { ElementType, ReactNode } from 'react';
import { emptyFunction } from 'shared/helpers';
import Table, { TTable } from './Table';
import { DEFAULT_TABLE_ITEMS_TYPE } from './constants';

type TTableContainer = TTable & {
  children?: ReactNode;
  TableCmpt?: typeof Table;
  Fallback?: ElementType;
};

const TableContainer = ({
  children,
  TableCmpt = Table,
  items = [],
  headers = [],
  Fallback = emptyFunction,
  itemsType = DEFAULT_TABLE_ITEMS_TYPE,
  ...restTable
}: TTableContainer) =>
  items.length > 0 ? (
    <TableCmpt items={items} headers={headers} itemsType={itemsType} aria-label={`Tableau de ${itemsType}`} {...restTable}>
      {children}
    </TableCmpt>
  ) : (
    <Fallback />
  );
export default TableContainer;
