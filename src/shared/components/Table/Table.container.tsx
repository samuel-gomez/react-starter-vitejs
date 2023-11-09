import { ElementType, ReactNode } from 'react';
import { emptyFunction } from 'shared/helpers';
import Table, { TTable } from './Table';
import { DEFAULT_TABLE_ARIA_LABEL } from './constants';

type TTableContainer = TTable & {
  children?: ReactNode;
  TableCmpt?: typeof Table;
  Fallback?: ElementType;
  ariaLabel?: string;
};

const TableContainer = ({
  children,
  TableCmpt = Table,
  items = [],
  headers = [],
  Fallback = emptyFunction,
  ariaLabel = DEFAULT_TABLE_ARIA_LABEL,
  ...restTable
}: TTableContainer) =>
  items.length > 0 ? (
    <TableCmpt items={items} headers={headers} aria-label={ariaLabel} {...restTable}>
      {children}
    </TableCmpt>
  ) : (
    <Fallback />
  );
export default TableContainer;
