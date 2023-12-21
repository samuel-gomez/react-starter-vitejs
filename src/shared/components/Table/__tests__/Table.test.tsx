import { render, screen, within } from 'shared/testsUtils/customRender';
import Table from '../Table';

const defaultProps = {
  classModifier: 'classModifier',
  title: 'my title',
  headers: [],
  items: [],
};

describe('Table', () => {
  it('Render <Table/> with empty items', () => {
    render(<Table {...defaultProps} />);
    const tbody = screen.getAllByRole('rowgroup')[1];
    expect(within(tbody).queryAllByRole('row').length).toBe(0);
  });

  const headers = [
    {
      label: 'label',
      key: 'uid',
      field: 'name',
    },
  ];
  const items = [
    {
      key: 'uid',
      cols: {
        name: {
          label: 'samuel',
        },
      },
    },
  ];

  it('Render <Table/> with 1 header and 1 item', () => {
    render(<Table {...defaultProps} headers={headers} items={items} />);

    const thead = screen.getAllByRole('rowgroup')[0];
    expect(within(thead).getAllByRole('columnheader').length).toBe(1);
    within(thead).getByText('label');

    const tbody = screen.getAllByRole('rowgroup')[1];
    expect(within(tbody).getAllByRole('row').length).toBe(1);
    within(tbody).getByText('samuel');
  });

  it('Render <Table/> without visible caption', async () => {
    render(<Table {...defaultProps} isCaptionVisible={false} />);
    expect(screen.getByText(defaultProps.title)).toHaveClass('sr-only');
  });
});
