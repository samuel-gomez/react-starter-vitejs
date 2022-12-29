import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { renderWithContainer } from 'shared/testsUtils';
import ThSortable, { SortingIcon, orderIcons } from '../ThSortable';

const defaultProps = {
  sort: vi.fn(),
};
const container = document.createElement('tr');

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
    ({ children, ...rest }) => {
      const { baseElement } = renderWithContainer(
        <ThSortable {...defaultProps} {...rest}>
          {children}
        </ThSortable>,
        container,
      );

      expect(baseElement).toMatchSnapshot();
    },
  );
});

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
    const { asFragment } = render(<SortingIcon />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render SortingIcon with order equal 1', () => {
    const { asFragment } = render(<SortingIcon order={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should render SortingIcon with order equal -1', () => {
    const { asFragment } = render(<SortingIcon order={-1} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
