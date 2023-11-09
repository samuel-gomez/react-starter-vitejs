import { emptyFunction, render } from 'shared/testsUtils';
import NotificationContainer from '../Notification.container';

describe('<NotificationContainer/>', () => {
  const useNotifyErrorFn = vi.fn();
  const NotificationCmpt = vi.fn();

  it('Should call useNotifyErrorFn when render NotificationContainer', () => {
    useNotifyErrorFn.mockReturnValue({ notifyError: emptyFunction, notifySuccess: emptyFunction, notifyWarning: emptyFunction });

    render(<NotificationContainer useNotifyErrorFn={useNotifyErrorFn} />);

    expect(useNotifyErrorFn).toHaveBeenCalled();
  });

  it('Should call NotificationCmpt with notification functions when render NotificationContainer', () => {
    NotificationCmpt.mockReturnValue('NotificationCmpt');

    render(<NotificationContainer useNotifyErrorFn={useNotifyErrorFn} NotificationCmpt={NotificationCmpt} />);

    expect(NotificationCmpt).toHaveBeenCalledWith(
      {
        notifyError: emptyFunction,
        notifySuccess: emptyFunction,
        notifyWarning: emptyFunction,
      },
      {},
    );
  });

  it('Should call NotificationCmpt when render NotificationContainer', () => {
    NotificationCmpt.mockReturnValue('NotificationCmpt');

    render(<NotificationContainer NotificationCmpt={NotificationCmpt} />);

    expect(NotificationCmpt).toHaveBeenCalled();
  });
});
