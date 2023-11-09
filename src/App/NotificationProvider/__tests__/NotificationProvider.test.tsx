import { useContext } from 'react';
import { render, screen, within } from '@testing-library/react';
import NotificationProvider, { NotificationContext } from '../NotificationProvider';
import type { TNotificationContext } from '../NotificationProvider';
import useNotifications from '../Notifications.hook';

const Base = ({ addNotification }: TNotificationContext) => {
  addNotification({ id: '02', label: 'title2' });
  return (
    <ul>
      <li>have addNotification</li>
    </ul>
  );
};

const BaseWithNotification = () => {
  const notificationProps = useContext(NotificationContext);
  return <Base {...notificationProps} />;
};

const addNotificationMock = vi.fn();
const onDeleteNotificationMock = vi.fn();

const App = ({ useNotificationsFn }: { useNotificationsFn: typeof useNotifications }) => (
  <NotificationProvider useNotificationsFn={useNotificationsFn}>
    <BaseWithNotification />
  </NotificationProvider>
);

describe('Render App with Base have addNotification props', () => {
  it('Should Base have fetchCustom props when call setFetchCustom', () => {
    const useNotificationsMock = vi.fn().mockReturnValue({
      addNotification: addNotificationMock,
      onDeleteNotification: onDeleteNotificationMock,
      stateNotifications: [],
    });
    render(<App useNotificationsFn={useNotificationsMock} />);
    expect(screen.getByText('have addNotification')).toBeDefined();
  });

  it('Should Base have fetchCustom props when call setFetchCustom with 1 notification', () => {
    const notification = {
      code: 200,
      detail: 'detail',
      label: 'labeldemonalert',
      id: 'id',
    };

    const useNotificationsMock = vi.fn().mockReturnValue({
      addNotification: addNotificationMock,
      onDeleteNotification: onDeleteNotificationMock,
      stateNotifications: [notification],
    });

    render(<App useNotificationsFn={useNotificationsMock} />);

    const aside = screen.getByRole('complementary');
    expect(aside).toHaveClass('af-notifications--open');

    const alert = within(aside).getByRole('alert');
    expect(alert).toHaveClass('af-alert--notification');
    expect(alert).toHaveClass('af-alert--error');

    expect(within(alert).getByText('labeldemonalert')).toBeDefined();

    expect(screen.getByText('have addNotification')).toBeDefined();
  });
});
