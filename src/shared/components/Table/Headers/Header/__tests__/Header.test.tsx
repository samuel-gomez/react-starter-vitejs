import { renderWithContainer } from 'shared/testsUtils';
import { screen, within } from 'shared/testsUtils/customRender';
import Header from '../Header';

const container = document.createElement('tr');

describe('Header', () => {
  it.each`
    scope
    ${undefined}
    ${'col'}
    ${'row'}
  `('Should render Header when scope: $scope', ({ scope }) => {
    const { baseElement } = renderWithContainer(<Header scope={scope} label="label" />, container);

    within(baseElement).getByRole(scope === 'col' || scope === undefined ? 'columnheader' : 'rowheader');
    screen.getByText('label');
  });

  it('Should render Header with class "af-table__th--blank" when isBlank is true', () => {
    const { baseElement } = renderWithContainer(<Header isBlank />, container);

    const header = within(baseElement).getByRole('columnheader');
    expect(header).toHaveClass('af-table__th af-table__th--blank');
  });

  it('Should render Header without class "af-table__th--blank" when isBlank is false', () => {
    const { baseElement } = renderWithContainer(<Header isBlank={false} />, container);

    const header = within(baseElement).getByRole('columnheader');
    expect(header).toHaveClass('af-table__th');
  });
});
