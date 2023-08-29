import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableContainer from '../Table.container';

const TableCmpt = vi.fn();

const defaultProps = {
  TableCmpt,
};

describe('TableContainer', () => {
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

  it('Render <TableContainer/> with 1 header and 1 item', () => {
    render(<TableContainer {...defaultProps} items={items} headers={headers} />);
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        children: undefined,
        headers,
        items,
        'aria-label': 'Tableau de données',
      },
      {},
    );
  });

  it('Render <TableContainer/> with 1 header and 1 item without headers', () => {
    render(<TableContainer {...defaultProps} items={items} />);
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        children: undefined,
        headers: [],
        items,
        'aria-label': 'Tableau de données',
      },
      {},
    );
  });

  it('Render <TableContainer/> with 1 header and 0 item', () => {
    const { container } = render(<TableContainer {...defaultProps} items={[]} headers={headers} Fallback={() => <p id="nodata" />} />);
    expect(container.querySelector('#nodata')).toBeInTheDocument();
  });

  it('Render <TableContainer/> with 1 header and 1 item and children', () => {
    render(
      <TableContainer {...defaultProps} items={items} headers={headers}>
        <tr>
          <td>hello</td>
        </tr>
      </TableContainer>,
    );
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        children: (
          <tr>
            <td>hello</td>
          </tr>
        ),
        headers,
        items,
        'aria-label': 'Tableau de données',
      },
      {},
    );
  });

  it('Render <TableContainer/> with Table view and children', () => {
    render(<TableContainer items={items} headers={headers} />);
    expect(screen.getByText('samuel')).toBeInTheDocument();
  });
});
