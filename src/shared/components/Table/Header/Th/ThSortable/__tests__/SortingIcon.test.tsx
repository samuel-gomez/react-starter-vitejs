import { render } from '@testing-library/react';
import SortingIcon, { orderIcons } from '../SortingIcon';

describe('orderIcons', () => {
  it.each`
    order        | expected
    ${undefined} | ${'sorting'}
    ${'NONE'}    | ${'sorting'}
    ${1}         | ${'arrow-xs-up'}
    ${-1}        | ${'arrow-xs-down'}
  `('Should return $expected when orderIcons have been called with order: $order', ({ order, expected }) => {
    const result = orderIcons(order);

    expect(result).toEqual(expected);
  });
});

describe('SortingIcon', () => {
  it('Should render SortingIcon with order equal NONE', () => {
    const { container } = render(<SortingIcon />);
    expect(container.querySelector('span')).toHaveClass('glyphicon-sorting');
  });

  it('Should render SortingIcon with order equal 1', () => {
    const { container } = render(<SortingIcon order={1} />);
    expect(container.querySelector('span')).toHaveClass('glyphicon-arrow-xs-up');
  });
  it('Should render SortingIcon with order equal -1', () => {
    const { container } = render(<SortingIcon order={-1} />);
    expect(container.querySelector('span')).toHaveClass('glyphicon-arrow-xs-down');
  });
});
