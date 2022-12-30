import { describe, it, expect } from 'vitest';
import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ModalPage from '../ModalCustom';

const defaultProps = {
  openModal: emptyFunction,
  onCancel: emptyFunction,
  isOpen: false,
};

describe('<ModalPage/>', () => {
  it('Should render ModalPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ModalPage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ModalPage with modal opened', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ModalPage {...defaultProps} isOpen />);
    expect(asFragment()).toMatchSnapshot();
  });
});
