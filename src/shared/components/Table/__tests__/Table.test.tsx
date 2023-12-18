import { render, screen } from 'shared/testsUtils/customRender';
import Table from '../Table';

const defaultProps = {
  classModifier: 'classModifier',
  title: 'my title',
  headers: [],
  items: [],
};

describe('Table', () => {
  it('Render <Table/> with empty items', () => {
    const { asFragment } = render(<Table {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
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
    const { asFragment } = render(<Table {...defaultProps} headers={headers} items={items} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <Table/> without visible caption', async () => {
    render(<Table {...defaultProps} isCaptionVisible={false} />);
    expect(screen.getByText(defaultProps.title)).toHaveClass('sr-only');
  });
});
