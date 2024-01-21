import { screen, within } from '@testing-library/react';
import isNull from 'lodash/isNull';
import { DEFAULT_TABLE_ITEMS_TYPE } from 'shared/components/Table/constants';

export const getTableByRole = async (itemsType: string) => {
  const table = await screen.findByRole('table', { name: RegExp(`Tableau de ${itemsType}`) });
  return table;
};

export const getTheadByRole = (table: HTMLElement) => within(table).getAllByRole('rowgroup')[0];

export const getTheadLineByRole = (thead: HTMLElement) => within(thead).getByRole('row');

export const getTheadCellsByRole = (theadLine: HTMLElement) => within(theadLine).getAllByRole('columnheader');

export const getTheadCellsButtonLineByRole = (theadLine: HTMLElement) => within(theadLine).getAllByRole('button');

export const getTbodyByRole = (table: HTMLElement) => within(table).getAllByRole('rowgroup')[1];

export const getTbodyLineByRole = (tbody: HTMLElement) => within(tbody).getAllByRole('row');

export const getTbodyLineCellByRole = (tbodyLine: HTMLElement) =>
  within(tbodyLine).queryAllByRole('rowheader').concat(within(tbodyLine).getAllByRole('cell'));

export const getTableHeadElements = async ({ tableItemsType, isButton = false }: { tableItemsType: string; isButton?: boolean }) => {
  const table = await getTableByRole(tableItemsType);
  const thead = getTheadByRole(table);
  const theadLine = getTheadLineByRole(thead);
  const cells = isButton ? getTheadCellsButtonLineByRole(theadLine) : getTheadCellsByRole(theadLine);
  return { table, thead, theadLine, cells };
};

export const getTableBodyElements = async ({ tableItemsType }: { tableItemsType: string }) => {
  const table = await getTableByRole(tableItemsType);
  const tbody = getTbodyByRole(table);
  const tbodyLines = getTbodyLineByRole(tbody);
  return { table, tbody, tbodyLines };
};

export const expectTable = async (tableItemsType = DEFAULT_TABLE_ITEMS_TYPE) => {
  const table = await getTableByRole(tableItemsType);
  expect(table).toBeInTheDocument();
};

export const expectCellsContent = (cells: HTMLElement[], ...args: string[]) => {
  const argsWithoutLast = [...args];
  argsWithoutLast.pop();

  argsWithoutLast
    .filter(item => !isNull(item))
    .forEach((headerLabel, index) => {
      expect(cells[index]).toHaveTextContent(RegExp(headerLabel));
    });
};
