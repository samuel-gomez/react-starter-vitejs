import type { ReactNode } from 'react';
import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import Line from './Line';

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
  ariaLabel?: string;
  items?: TItems[];
  children?: ReactNode;
};

const Body = ({ items = [], children, ariaLabel = 'table-body' }: TBody) => (
  <TableTk.Body aria-label={ariaLabel}>
    {items.map(({ key, classModifier, cols }) => (
      <Line key={key} classModifier={classModifier} cols={Object.entries({ ...cols })} />
    ))}
    {children}
  </TableTk.Body>
);

export default Body;
