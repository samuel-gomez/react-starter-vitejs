import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ASCENDING } from 'shared/components/Table/constants';
import ThContainer from '../Th.container';

const onSort = vi.fn();
const ThSortableCmpt = vi.fn();
const ThCmpt = vi.fn();
const defaultProps = {
  sorting: {
    field: '',
    order: ASCENDING,
  },
  field: '',
  onSort,
  ThSortableCmpt,
  ThCmpt,
} as const;

describe('ThContainer', () => {
  it('Render <ThContainer/> with field empty (not sortable)', () => {
    render(<ThContainer {...defaultProps}>child th</ThContainer>);
    expect(ThCmpt).toHaveBeenCalledWith(
      {
        children: 'child th',
      },
      {},
    );
  });

  it('Render <ThContainer/> with field not empty (sortable)', () => {
    const customProps = {
      ...defaultProps,
      field: 'myfield',
      sorting: { field: 'name', order: ASCENDING },
    } as const;
    render(<ThContainer {...customProps}>child th</ThContainer>);
    expect(ThSortableCmpt).toHaveBeenCalledWith(
      {
        sorting: { field: 'name', order: ASCENDING },
        field: 'myfield',
        children: 'child th',
        onSort,
      },
      {},
    );
  });
});
