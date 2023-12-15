import { ComponentPropsWithoutRef } from 'react';
import { Table as TableTk } from '@axa-fr/react-toolkit-all';
import Td, { TTdContainer } from './Td';

export type TLine = ComponentPropsWithoutRef<typeof TableTk.Tr> & {
  columns: (TTdContainer & { keyCol: string })[];
  itemsType: string;
  lineNumber: number;
};

const Line = ({ className, columns = [], classModifier = '', children, lineNumber, itemsType }: TLine) => (
  <TableTk.Tr classModifier={classModifier} className={className} aria-label={`Ligne ${lineNumber} du tableau de ${itemsType}`}>
    <>
      {columns.map(({ keyCol, ...restTd }) => (
        <Td key={keyCol} {...restTd} />
      ))}
      {children}
    </>
  </TableTk.Tr>
);

export default Line;
