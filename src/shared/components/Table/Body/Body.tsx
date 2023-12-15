import type { ReactNode } from 'react';
import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import Line from './Line';
import { DEFAULT_TABLE_ITEMS_TYPE } from '../constants';

export type Tcol = {
  label?: string;
  hover?: string;
  children?: ReactNode;
  classModifier?: string;
};

export type TCols = {
  [k: string]: Tcol;
};

type TItems = {
  key: string;
  classModifier?: string;
  cols: TCols;
};

export type TBody = {
  items?: TItems[];
  children?: ReactNode;
  itemsType?: string;
};

const Body = ({ items = [], children, itemsType = DEFAULT_TABLE_ITEMS_TYPE }: TBody) => (
  <TableTk.Body aria-label={`Corps du tableau de ${itemsType}`}>
    {items.map(({ key, classModifier, cols }, index) => (
      <Line key={key} lineNumber={index + 1} itemsType={itemsType} classModifier={classModifier} cols={Object.entries({ ...cols })} />
    ))}
    {children}
  </TableTk.Body>
);

export default Body;
