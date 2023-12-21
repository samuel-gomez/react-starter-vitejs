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

  const tableTitle = 'Liste des prénoms';
  const itemsType = 'prénoms';

  it('Render <TableContainer/> with 1 header and 1 item', () => {
    render(<TableContainer {...defaultProps} title={tableTitle} items={items} itemsType={itemsType} headers={headers} />);
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        title: tableTitle,
        children: undefined,
        headers,
        items,
        'aria-label': `Tableau de ${itemsType}`,
      },
      {},
    );
  });

  it('Render <TableContainer/> with 1 header and 1 item without headers', () => {
    render(<TableContainer {...defaultProps} title={tableTitle} items={items} itemsType={itemsType} />);
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        title: tableTitle,
        children: undefined,
        headers: [],
        items,
        'aria-label': `Tableau de ${itemsType}`,
      },
      {},
    );
  });

  it('Render <TableContainer/> with 1 header and 0 item', () => {
    const { container } = render(
      <TableContainer {...defaultProps} title={tableTitle} items={[]} headers={headers} Fallback={() => <p id="nodata" />} />,
    );
    expect(container.querySelector('#nodata')).toBeInTheDocument();
  });

  it('Render <TableContainer/> with 1 header and 1 item and children', () => {
    render(
      <TableContainer {...defaultProps} title={tableTitle} items={items} itemsType={itemsType} headers={headers}>
        <tr>
          <td>hello</td>
        </tr>
      </TableContainer>,
    );
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        title: tableTitle,
        children: (
          <tr>
            <td>hello</td>
          </tr>
        ),
        headers,
        items,
        'aria-label': `Tableau de ${itemsType}`,
      },
      {},
    );
  });

  it('Render <TableContainer/> with Table view and children', () => {
    render(<TableContainer title={tableTitle} items={items} headers={headers} />);
    expect(screen.getByText('samuel')).toBeInTheDocument();
  });
});
