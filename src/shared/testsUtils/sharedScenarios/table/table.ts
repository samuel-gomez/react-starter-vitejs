import { DefineStepFunction } from 'jest-cucumber';
import isNull from 'lodash/isNull';
import { screen, within } from '@testing-library/dom';
import { expect } from 'vitest';
import { getTableByRole } from './utils';

export const LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant = (
  instruction: DefineStepFunction,
  headers?: string,
  scenarioName = `le tableau présente des entêtes de colonnes dans l’ordre suivant : ${headers}`,
  tableName = 'Tableau de données',
) =>
  instruction(scenarioName, async (...args: string[]) => {
    const table = await getTableByRole(tableName);
    const thead = within(table).getByRole('rowgroup', { name: 'table-header' });
    const theadLine = within(thead).getByRole('row', { name: 'table-header-line' });
    const cells = within(theadLine).getAllByRole('button');
    args
      .filter(item => !isNull(item))
      .forEach((headerLabel, index) => {
        expect(cells[index]).toHaveTextContent(RegExp(headerLabel));
      });
  });

export const LeTableauContientLesLignesCorrespondantAuxDonneesRecues = (
  instruction: DefineStepFunction,
  scenarioName = 'le tableau contient les informations suivantes :',
  tableName = 'Tableau de données',
) =>
  instruction(scenarioName, async (items: string[]) => {
    const table = await screen.findByRole('table', { name: RegExp(tableName) });
    const tbody = within(table).getByRole('rowgroup', { name: 'table-body' });
    const tbodyLines = within(tbody).getAllByRole('row', { name: 'table-body-line' });

    tbodyLines.forEach((tbodyLine, index) => {
      const cells = within(tbodyLine).getAllByRole('cell');
      Object.values(items[index]).forEach((valueCell, indexCell) => {
        // il est nécessaire d'ajouter un classModifier="actions" sur les cellules concernées
        if (cells[indexCell].classList?.contains('af-table__cell--actions')) {
          // il est nécessaire d'ajouter un arial-label au format 'choice-x'
          expect(within(cells[indexCell]).getByLabelText(`choice-${valueCell}`)).toBeInTheDocument();
        } else {
          expect(cells[indexCell]).toHaveTextContent(RegExp(valueCell));
        }
      });
    });
  });

export const LaPageContientUnTableau = (
  instruction: DefineStepFunction,
  scenarioName = 'la page contient un tableau',
  tableName = 'Tableau de données',
) =>
  instruction(scenarioName, () => {
    const table = screen.getByRole('table', {
      name: RegExp(tableName),
    });
    expect(table).toBeInTheDocument();
  });
