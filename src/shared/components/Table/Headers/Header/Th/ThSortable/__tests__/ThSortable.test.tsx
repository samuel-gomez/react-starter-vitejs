import { renderWithContainer } from 'shared/testsUtils';
import { within } from 'shared/testsUtils/customRender';
import { orderIcons } from '../SortingIcon';
import ThSortable from '../ThSortable';

const defaultProps = {
  sort: vi.fn(),
};
const trContainer = document.createElement('tr');

describe('ThSortable', () => {
  it.each`
    order     | children     | classModifier
    ${''}     | ${undefined} | ${undefined}
    ${'NONE'} | ${undefined} | ${undefined}
    ${'NONE'} | ${'child'}   | ${undefined}
    ${'NONE'} | ${'child'}   | ${'variant'}
    ${1}      | ${'child'}   | ${'variant'}
    ${-1}     | ${'child'}   | ${'variant'}
  `(
    'Should render <ThSortable/> when order: $order, children: $children, className: $className, classModifier: $classModifier',
    ({ order, children, ...rest }) => {
      const { baseElement, container } = renderWithContainer(
        <ThSortable {...defaultProps} {...rest} order={order}>
          {children}
        </ThSortable>,
        trContainer,
      );

      expect(container.querySelector(`.glyphicon-${orderIcons(order)}`)).toBeInTheDocument();

      if (children) {
        within(baseElement).getByText(children);
      }
    },
  );
});
