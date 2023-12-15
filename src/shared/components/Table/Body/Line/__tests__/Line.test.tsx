import { renderWithContainer } from 'shared/testsUtils';
import Line from '../Line';

const container = document.createElement('tbody');

const columnsMock = [
  {
    hover: undefined,
    keyCol: 'sexe',
    label: 'F',
  },
];

const itemsType = 'users';

describe('Line', () => {
  it.each`
    columns        | className    | modifier      | children     | lineNumber
    ${undefined}   | ${undefined} | ${undefined}  | ${undefined} | ${1}
    ${[]}          | ${undefined} | ${undefined}  | ${undefined} | ${2}
    ${columnsMock} | ${undefined} | ${undefined}  | ${undefined} | ${3}
    ${columnsMock} | ${undefined} | ${'modifier'} | ${undefined} | ${4}
  `(
    'Should render <Line/> when columns: $columns, className: $className, modifier: $modifier, children: $children, lineNumber: $lineNumber',
    ({ columns, className, modifier, children, lineNumber }) => {
      const { baseElement } = renderWithContainer(
        <Line className={className} itemsType={itemsType} lineNumber={lineNumber} columns={columns} classModifier={modifier}>
          {children}
        </Line>,
        container,
      );
      expect(baseElement).toMatchSnapshot();
    },
  );
});
