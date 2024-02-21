import { within } from '@testing-library/dom';
import { type DefineStepFunction } from 'jest-cucumber';
import { DEFAULT_TABLE_ITEMS_TYPE } from 'shared/components/Table/constants';
import { expectCellsContent, expectTable, getTableBodyElements, getTableHeadElements, getTbodyLineCellByRole } from './utils';

/**
 * Méthode de scénario permettant de vérifier le contenu des cellules du header d'un tableau
 */
export const LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant = (
  instruction: DefineStepFunction,
  scenarioName: string | RegExp,
  tableItemsType = DEFAULT_TABLE_ITEMS_TYPE,
) =>
  instruction(scenarioName, async (...args: string[]) => {
    const { cells } = await getTableHeadElements({ tableItemsType });
    expectCellsContent(cells, ...args);
  });

/**
 * Méthode de scénario permettant de vérifier le contenu des cellules de tri du header d'un tableau
 */
export const LeTableauPresenteDesEntetesDeTriDeColonnesDansLOrdreSuivant = (
  instruction: DefineStepFunction,
  scenarioName: string | RegExp,
  tableItemsType = DEFAULT_TABLE_ITEMS_TYPE,
) =>
  instruction(scenarioName, async (...args: string[]) => {
    const { cells } = await getTableHeadElements({ tableItemsType, isButton: true });
    expectCellsContent(cells, ...args);
  });

/**
 * Méthode de scénario permettant de vérifier le contenu des cellules du tbody d'un tableau
 * Le nom du scénario doit contenir le nombre de lignes et de colonnes
 */
export const LeTableauContientLesLignesCorrespondantAuxDonneesRecues = (
  instruction: DefineStepFunction,
  scenarioName: string | RegExp,
  tableItemsType = DEFAULT_TABLE_ITEMS_TYPE,
) =>
  instruction(scenarioName, async (lines, cols, items: string[]) => {
    const { tbodyLines } = await getTableBodyElements({ tableItemsType });
    expect(tbodyLines).toHaveLength(lines);

    tbodyLines.forEach((tbodyLine, index) => {
      const cells = getTbodyLineCellByRole(tbodyLine);
      expect(cells).toHaveLength(cols);

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

/**
 * Méthode de scénario permettant de vérifier présence d'un tableau
 */
export const LaPageContientUnTableau = (
  instruction: DefineStepFunction,
  scenarioName = 'la page contient un tableau',
  tableItemsType = DEFAULT_TABLE_ITEMS_TYPE,
) =>
  instruction(scenarioName, async () => {
    await expectTable(tableItemsType);
  });
