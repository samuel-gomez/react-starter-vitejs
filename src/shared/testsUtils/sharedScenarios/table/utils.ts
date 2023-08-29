import { within, screen } from '@testing-library/react';

export const getTableByRole = async (tableName: string) => {
  const table = await screen.findByRole('table', { name: RegExp(tableName) });
  return table;
};
export const expectTable = (tableName = 'Tableau de données') => {
  const table = screen.getByRole('table', {
    name: RegExp(tableName),
  });
  expect(table).toBeInTheDocument();
};

export const getTheadByRole = (table: HTMLTableElement, name = 'table-header') => within(table).getByRole('rowgroup', { name });

export const getTheadLineByRole = (thead: HTMLElement, name = 'table-header-line') => within(thead).getByRole('row', { name });
