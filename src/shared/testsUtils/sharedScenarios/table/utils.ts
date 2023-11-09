import { within, screen } from '@testing-library/react';
import isNull from 'lodash/isNull';
import { DEFAULT_TABLE_ARIA_LABEL } from 'shared/components/Table/constants';

export const getTableByRole = async (tableName: string) => {
  const table = await screen.findByRole('table', { name: RegExp(tableName) });
  return table;
};

export const getTheadByRole = (table: HTMLElement, name = 'table-header') => within(table).getByRole('rowgroup', { name });

export const getTheadLineByRole = (thead: HTMLElement, name = 'table-header-line') => within(thead).getByRole('row', { name });

export const getTheadCellsByRole = (theadLine: HTMLElement) => within(theadLine).getAllByRole('columnheader');

export const getTheadCellsButtonLineByRole = (theadLine: HTMLElement) => within(theadLine).getAllByRole('button');

export const getTbodyByRole = (table: HTMLElement, name = 'table-body') => within(table).getByRole('rowgroup', { name });

export const getTbodyLineByRole = (tbody: HTMLElement, name = 'table-body-line') => within(tbody).getAllByRole('row', { name });

export const getTbodyLineCellByRole = (tbodyLine: HTMLElement) => within(tbodyLine).getAllByRole('cell');

export const getTableHeadElements = async ({ tableName, isButton = false }: { tableName: string; isButton?: boolean }) => {
  const table = await getTableByRole(tableName);
  const thead = getTheadByRole(table);
  const theadLine = getTheadLineByRole(thead);
  const cells = isButton ? getTheadCellsButtonLineByRole(theadLine) : getTheadCellsByRole(theadLine);
  return { table, thead, theadLine, cells };
};

export const getTableBodyElements = async ({ tableName }: { tableName: string }) => {
  const table = await getTableByRole(tableName);
  const tbody = getTbodyByRole(table);
  const tbodyLines = getTbodyLineByRole(tbody);
  return { table, tbody, tbodyLines };
};

export const expectTable = async (tableName = DEFAULT_TABLE_ARIA_LABEL) => {
  const table = await getTableByRole(tableName);
  expect(table).toBeInTheDocument();
};

export const expectCellsContent = (cells: HTMLElement[], ...args: string[]) => {
  args
    .filter(item => !isNull(item))
    .forEach((headerLabel, index) => {
      expect(cells[index]).toHaveTextContent(RegExp(headerLabel));
    });
};
