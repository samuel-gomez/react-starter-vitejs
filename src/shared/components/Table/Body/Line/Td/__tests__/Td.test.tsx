import { renderWithContainer, within } from 'shared/testsUtils';
import Td from '../Td';

const defaultProps = {
  children: null,
  label: 'label',
  hover: null,
};
const trContainer = document.createElement('tr');

describe('Td', () => {
  it('Render <Td/> without hover', () => {
    const { container } = renderWithContainer(<Td {...defaultProps}>child th</Td>, trContainer);
    within(container).getByText(/label/);
  });

  it('Render <Td/> with hover', () => {
    const { container } = renderWithContainer(
      <Td {...defaultProps} classModifier="custom" hover={<p>Hover content</p>}>
        child td
      </Td>,
      trContainer,
    );
    expect(container.getElementsByClassName('af-popover__wrapper').length).toBe(1);
  });
});
