import { renderWithContainer } from 'shared/testsUtils';
import { screen, within } from 'shared/testsUtils/customRender';
import Headers from '../Headers';

const defaultProps = {
  onSort: vi.fn(),
};

const container = document.createElement('table');

const headersMock = [
  {
    label: 'label',
    key: 'uid',
    field: 'name',
  },
];
const sortingMock = {
  field: 'name',
  order: 1,
};

describe('Headers', () => {
  it.each`
    headers        | sorting        | children
    ${undefined}   | ${undefined}   | ${undefined}
    ${[]}          | ${undefined}   | ${undefined}
    ${headersMock} | ${undefined}   | ${undefined}
    ${headersMock} | ${sortingMock} | ${undefined}
    ${undefined}   | ${sortingMock} | ${undefined}
    ${headersMock} | ${sortingMock} | ${(<th>child header</th>)}
  `('Should render Header when headers: $headers, sorting: $sorting', ({ headers, sorting, children }) => {
    const { baseElement } = renderWithContainer(
      <Headers {...defaultProps} headers={headers} sorting={sorting}>
        {children}
      </Headers>,
      container,
    );

    // calculate the number of columnheader in the screen
    let columnHeaderNumber = headers !== undefined ? headers.length : 0;
    // when sorting, the th tag takes a 'button' role and is therefore not a columnheader
    if (sortingMock && columnHeaderNumber > 0) {
      columnHeaderNumber -= 1;
    }
    if (children) {
      columnHeaderNumber += 1;
    }

    expect(within(baseElement).queryAllByRole('columnheader').length).toBe(columnHeaderNumber);
    if (headers?.length > 0) {
      screen.getByText('label');
    }
    if (children) {
      screen.getByText('child header');
    }
  });
});
