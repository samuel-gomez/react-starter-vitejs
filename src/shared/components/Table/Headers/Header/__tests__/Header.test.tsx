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
});
