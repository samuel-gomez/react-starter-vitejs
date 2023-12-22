import { render } from '@testing-library/react';
import { ASCENDING } from 'shared/components/Table/constants';
import ThContainer from '../Th';

const onSort = vi.fn();
const ThSortableCmpt = vi.fn();
const ThCmpt = vi.fn();
const defaultProps = {
  sorting: {
    field: '',
    order: ASCENDING,
  },
  field: '',
  scope: 'row',
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
        scope: 'row',
      },
      {},
    );
  });

  it('Render <ThContainer/> with field not empty (sortable)', () => {
    const customProps = {
      ...defaultProps,
      scope: 'col',
      field: 'myfield',
      sorting: { field: 'name', order: ASCENDING },
    } as const;
    render(<ThContainer {...customProps}>child th</ThContainer>);
    expect(ThSortableCmpt).toHaveBeenCalledWith(
      {
        sorting: { field: 'name', order: ASCENDING },
        field: 'myfield',
        scope: 'col',
        children: 'child th',
        onSort,
      },
      {},
    );
  });
});
