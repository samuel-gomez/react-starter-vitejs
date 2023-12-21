import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import { ComponentPropsWithoutRef } from 'react';
import Td, { TTdContainer } from './Td';

export type TLine = ComponentPropsWithoutRef<typeof TableTk.Tr> & {
  columns: (TTdContainer & { keyCol: string })[];
};

const Line = ({ className, columns = [], classModifier = '', children }: TLine) => (
  <TableTk.Tr classModifier={classModifier} className={className}>
    <>
      {columns.map(({ keyCol, ...restTd }) => (
        <Td key={keyCol} {...restTd} />
      ))}
      {children}
    </>
  </TableTk.Tr>
);

export default Line;
