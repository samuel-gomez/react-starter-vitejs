import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import type { ReactNode } from 'react';
import Line from './Line';
import { type Tcol } from './types.d';

export type TCols = {
  [k: string]: Tcol;
};

export type TItems = {
  key: string;
  classModifier?: string;
  cols: TCols;
};

export type TBody = {
  items?: TItems[];
  children?: ReactNode;
};

const Body = ({ items = [], children }: TBody) => (
  <TableTk.Body>
    {items.map(({ key, classModifier, cols }) => (
      <Line key={key} classModifier={classModifier} cols={Object.entries({ ...cols })} />
    ))}
    {children}
  </TableTk.Body>
);

export default Body;
