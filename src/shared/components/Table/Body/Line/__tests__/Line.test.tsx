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

describe('Line', () => {
  it.each`
    columns        | className    | modifier      | children
    ${undefined}   | ${undefined} | ${undefined}  | ${undefined}
    ${[]}          | ${undefined} | ${undefined}  | ${undefined}
    ${columnsMock} | ${undefined} | ${undefined}  | ${undefined}
    ${columnsMock} | ${undefined} | ${'modifier'} | ${undefined}
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
      } else {
        expect(within(baseElement).queryByText('F')).toBeNull();
      }

      if (modifier) {
        expect(container.firstChild).toHaveClass('af-table__tr--modifier');
      }
    },
  );
});
