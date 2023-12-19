import { renderWithContainer } from 'shared/testsUtils';
import { within } from 'shared/testsUtils/customRender';
import Line from '../Line';

const tbodyContainer = document.createElement('tbody');

const columnsMock = [
  {
    hover: undefined,
    keyCol: 'sexe',
    label: 'F',
  },
];
const headerColumnsMock = [
  {
    ...columnsMock[0],
    isHeader: true,
  },
];

describe('Line', () => {
  it.each`
    columns              | className    | modifier      | children
    ${undefined}         | ${undefined} | ${undefined}  | ${undefined}
    ${[]}                | ${undefined} | ${undefined}  | ${undefined}
    ${columnsMock}       | ${undefined} | ${undefined}  | ${undefined}
    ${headerColumnsMock} | ${undefined} | ${undefined}  | ${undefined}
    ${columnsMock}       | ${undefined} | ${'modifier'} | ${undefined}
  `(
    'Should render <Line/> when columns: $columns, className: $className, modifier: $modifier, children: $children',
    ({ columns, className, modifier, children }) => {
      const { baseElement, container } = renderWithContainer(
        <Line className={className} columns={columns} classModifier={modifier}>
          {children}
        </Line>,
        tbodyContainer,
      );

      if (columns && columns.length > 0) {
        within(baseElement).getByText('F');

        if (columns[0]?.isHeader) {
          within(baseElement).getByRole('rowheader');
        } else {
          expect(within(baseElement).queryByRole('rowheader')).toBeNull();
        }
      } else {
        expect(within(baseElement).queryByText('F')).toBeNull();
      }

      if (modifier) {
        expect(container.firstChild).toHaveClass('af-table__tr--modifier');
      }
    },
  );
});
