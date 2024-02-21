import { renderWithContainer } from 'shared/testsUtils';
import LineContainer, { type TLineContainer } from '../Line.container';

const LineCmpt = vi.fn();

const defaultProps = {
  LineCmpt,
};

const container = document.createElement('tbody');
const cols = [
  ['firstname', { label: 'Antonius' }],
  ['lastname', { label: 'Panketh' }],
  ['birthdate', { label: '20/12/1968' }],
  ['sexe', { label: 'F' }],
] as unknown as TLineContainer['cols'];

describe('LineContainer', () => {
  it('Render <LineContainer/> with cols and actions', () => {
    renderWithContainer(<LineContainer {...defaultProps} cols={cols} />, container);

    expect(LineCmpt).toHaveBeenCalledWith(
      {
        columns: [
          {
            keyCol: 'firstname',
            label: 'Antonius',
          },
          {
            keyCol: 'lastname',
            label: 'Panketh',
          },
          {
            keyCol: 'birthdate',
            label: '20/12/1968',
          },
          {
            keyCol: 'sexe',
            label: 'F',
          },
        ],
      },
      {},
    );
  });
});
