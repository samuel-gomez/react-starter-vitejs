import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import NotificationContainer from '../Notification.container';
import { ALERT_TYPE } from '../../constants';

describe('NotificationContainer', () => {
  const NotificationCmpt = vi.fn();
  NotificationCmpt.mockImplementation(() => <>NotificationCmpt</>);

  const defaultProps = {
    onClose: emptyFunction,
    id: 'id',
    label: 'title',
    NotificationCmpt,
  };

  it('Render <NotificationContainer/>', () => {
    const { getByText } = render(<NotificationContainer {...defaultProps} />);

    expect(getByText('NotificationCmpt')).toBeInTheDocument();

    expect(NotificationCmpt).toHaveBeenCalledWith(
      {
        classModifier: 'error',
        type: ALERT_TYPE.error,
        id: 'id',
        label: 'title',
        onClose: emptyFunction,
      },
      {},
    );
  });

  it('Render <NotificationContainer/> with all props', () => {
    const allProps = {
      ...defaultProps,
      type: ALERT_TYPE.success,
      classModifier: 'mymodifier',
    };
    const { getByText } = render(<NotificationContainer {...allProps} />);

    expect(getByText('NotificationCmpt')).toBeInTheDocument();

    expect(NotificationCmpt).toHaveBeenCalledWith(
      {
        classModifier: 'success mymodifier',
        type: ALERT_TYPE.success,
        id: 'id',
        label: 'title',
        onClose: emptyFunction,
      },
      {},
    );
  });
});
