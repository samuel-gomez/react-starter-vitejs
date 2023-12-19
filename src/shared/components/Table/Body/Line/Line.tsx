import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import { ComponentPropsWithoutRef } from 'react';
import Header, { THeader } from '../../Headers/Header';
import Td, { TTdContainer } from './Td';

export type TLine = ComponentPropsWithoutRef<typeof TableTk.Tr> & {
  columns: (TTdContainer & Omit<THeader, 'key'> & { keyCol: string; isHeader?: boolean })[];
};

const Line = ({ className, columns = [], classModifier = '', children }: TLine) => (
  <TableTk.Tr classModifier={classModifier} className={className}>
    <>
      {columns.map(({ keyCol, isHeader = false, ...restTd }) =>
        isHeader ? <Header key={keyCol} scope="row" {...restTd} /> : <Td key={keyCol} {...restTd} />,
      )}
      {children}
    </>
  </TableTk.Tr>
);

export default Line;
