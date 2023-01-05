import { describe, it, expect, vi } from 'vitest';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ModalPageContainer from '../ModalCustom.container';

describe('<ModalPageContainer/>', () => {
  const ModalPageCmpt = vi.fn().mockReturnValue('ModalPageCmpt');
  const onCancel = vi.fn();
  const openModal = vi.fn();

  it('Should render ModalPageContainer and called functions', () => {
    const useToggleModalFn = vi.fn().mockReturnValue({
      onCancel,
      openModal,
      isOpen: false,
    });

    renderWithWrapperStaticRouter(<ModalPageContainer ModalPageCmpt={ModalPageCmpt} useToggleModalFn={useToggleModalFn} />);

    expect(useToggleModalFn).toHaveBeenCalled();
    expect(ModalPageCmpt).toHaveBeenCalledWith(
      {
        onCancel,
        openModal,
        isOpen: false,
      },
      {},
    );
  });
});
