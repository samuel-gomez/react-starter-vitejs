import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import type { ReactNode } from 'react';
import ThSortableContainer, { type TsetSort } from './ThSortable';

export type TTh = Omit<TsetSort, 'onSort' | 'field'> & {
  ThSortableCmpt?: typeof ThSortableContainer;
  ThCmpt?: typeof TableTk.Th;
  children?: ReactNode;
  classModifier?: string;
  onSort?: TsetSort['onSort'];
  field?: TsetSort['field'];
  scope?: string;
};

const Th = ({ field, sorting, onSort, ThSortableCmpt = ThSortableContainer, ThCmpt = TableTk.Th, scope, ...rest }: TTh) =>
  field && onSort ? <ThSortableCmpt scope={scope} sorting={sorting} onSort={onSort} field={field} {...rest} /> : <ThCmpt scope={scope} {...rest} />;

export default Th;
