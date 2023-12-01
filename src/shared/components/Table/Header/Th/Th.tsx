import type { ReactNode } from 'react';
import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import ThSortableContainer, { TsetSort } from './ThSortable';

export type TTh = Omit<TsetSort, 'onSort' | 'field'> & {
  ThSortableCmpt?: typeof ThSortableContainer;
  ThCmpt?: typeof TableTk.Th;
  children?: ReactNode;
  classModifier?: string;
  onSort?: TsetSort['onSort'];
  field?: TsetSort['field'];
};

const Th = ({ field, sorting, onSort, ThSortableCmpt = ThSortableContainer, ThCmpt = TableTk.Th, ...rest }: TTh) =>
  field && onSort ? <ThSortableCmpt {...rest} sorting={sorting} onSort={onSort} field={field} /> : <ThCmpt role="columnheader" {...rest} />;

export default Th;
