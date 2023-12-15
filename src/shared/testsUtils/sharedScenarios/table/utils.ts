import { screen, within } from '@testing-library/react';
import isNull from 'lodash/isNull';
import { DEFAULT_TABLE_ITEMS_TYPE } from 'shared/components/Table/constants';

export const getTableByRole = async (itemsType: string) => {
  const table = await screen.findByRole('table', { name: RegExp(`Tableau de ${itemsType}`) });
  return table;
};

export const getTheadByRole = (table: HTMLElement, itemsType = DEFAULT_TABLE_ITEMS_TYPE) =>
  within(table).getByRole('rowgroup', { name: `En-tête du tableau de ${itemsType}` });

export const getTheadLineByRole = (thead: HTMLElement, itemsType = DEFAULT_TABLE_ITEMS_TYPE) =>
  within(thead).getByRole('row', { name: `Ligne de l'en-tête du tableau de ${itemsType}` });

export const getTheadCellsByRole = (theadLine: HTMLElement) => within(theadLine).getAllByRole('columnheader');

export const getTheadCellsButtonLineByRole = (theadLine: HTMLElement) => within(theadLine).getAllByRole('button');

export const getTbodyByRole = (table: HTMLElement, itemsType = DEFAULT_TABLE_ITEMS_TYPE) =>
  within(table).getByRole('rowgroup', { name: `Corps du tableau de ${itemsType}` });

export const getTbodyLineByRole = (tbody: HTMLElement, itemsType = DEFAULT_TABLE_ITEMS_TYPE) =>
  within(tbody).getAllByRole('row', { name: RegExp(`Ligne \\d+ du tableau de ${itemsType}`) });

export const getTbodyLineCellByRole = (tbodyLine: HTMLElement) => within(tbodyLine).getAllByRole('cell');

export const getTableHeadElements = async ({ tableItemsType, isButton = false }: { tableItemsType: string; isButton?: boolean }) => {
  const table = await getTableByRole(tableItemsType);
  const thead = getTheadByRole(table, tableItemsType);
  const theadLine = getTheadLineByRole(thead, tableItemsType);
  const cells = isButton ? getTheadCellsButtonLineByRole(theadLine) : getTheadCellsByRole(theadLine);
  return { table, thead, theadLine, cells };
};

export const getTableBodyElements = async ({ tableItemsType }: { tableItemsType: string }) => {
  const table = await getTableByRole(tableItemsType);
  const tbody = getTbodyByRole(table, tableItemsType);
  const tbodyLines = getTbodyLineByRole(tbody, tableItemsType);
  return { table, tbody, tbodyLines };
};

export const expectTable = async (tableItemsType = DEFAULT_TABLE_ITEMS_TYPE) => {
  const table = await getTableByRole(tableItemsType);
  expect(table).toBeInTheDocument();
};

export const expectCellsContent = (cells: HTMLElement[], ...args: string[]) => {
  args
    .filter(item => !isNull(item))
    .forEach((headerLabel, index) => {
      expect(cells[index]).toHaveTextContent(RegExp(headerLabel));
    });
};
