import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import { ComponentPropsWithoutRef } from 'react';
import Header from '../../Headers/Header';
import { type Tcol } from '../types';
import Td, { TTdContainer } from './Td';

export type TLine = ComponentPropsWithoutRef<typeof TableTk.Tr> & {
  columns: (TTdContainer & Tcol & { keyCol: string })[];
};

const Line = ({ className, columns = [], classModifier = '', children }: TLine) => (
  <TableTk.Tr classModifier={classModifier} className={className}>
    <>
      {columns.map(({ keyCol, isHeader = false, ...restTd }) =>
        isHeader ? <Header key={keyCol} scope="row" {...restTd} classModifier="row" /> : <Td key={keyCol} {...restTd} />,
      )}
      {children}
    </>
  </TableTk.Tr>
);

export default Line;
