import { renderWithContainer } from 'shared/testsUtils';
import { screen, within } from 'shared/testsUtils/customRender';
import Header from '../Header';
import { THeader } from '../type';

const defaultProps = {
  onSort: vi.fn(),
};

const container = document.createElement('tr');

const headerMock: THeader = {
  label: 'label',
  key: 'uid',
  field: 'name',
};
const sortingMock = {
  field: 'name',
  order: 1,
};

describe('Header', () => {
  it.each`
    header        | sorting        | scope
    ${headerMock} | ${undefined}   | ${undefined}
    ${headerMock} | ${sortingMock} | ${'col'}
    ${headerMock} | ${undefined}   | ${'row'}
    ${headerMock} | ${sortingMock} | ${'row'}
  `('Should render Header when header: $header, sorting: $sorting, scope: $scope', ({ header, sorting, scope }) => {
    const { baseElement } = renderWithContainer(<Header scope={scope} label={header.label} sorting={sorting} {...defaultProps} />, container);

    within(baseElement).getByRole(scope === 'col' || scope === undefined ? 'columnheader' : 'rowheader');
    screen.getByText('label');
  });
});
