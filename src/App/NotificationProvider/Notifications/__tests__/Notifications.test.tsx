import { render, screen, within } from '@testing-library/react';
import { emptyFunction, userEvent } from 'shared/testsUtils';
import Notifications from '../Notifications';

const defaultProps = {
  notifications: [],
  deleteNotification: emptyFunction,
};

describe('Notifications', () => {
  it('Render <Notifications/>', () => {
    render(<Notifications {...defaultProps} />);
    expect(screen.getByRole('complementary')).toHaveClass('af-notifications');
  });

  it('Should contain Notification when array notifications is NOT empty', () => {
    const notifications = [{ id: 'id', label: 'titleerror', classModifier: '', onClose: emptyFunction }];
    render(<Notifications {...defaultProps} notifications={notifications} />);

    const asideContainer = screen.getByRole('complementary');
    expect(asideContainer).toHaveClass('af-notifications');

    const alert = within(asideContainer).getByRole('alert');
    expect(within(alert).getByText('titleerror')).toBeInTheDocument();
  });

  it('Should called onDeleteNotification with id When click on close button', async () => {
    const deleteNotificationMock = vi.fn();
    const notifications = [{ id: 'id', label: 'title' }];
    render(<Notifications {...defaultProps} notifications={notifications} deleteNotification={deleteNotificationMock} />);
    await userEvent.click(screen.getByRole('button'));
    expect(deleteNotificationMock).toBeCalledWith('id');
  });
});
