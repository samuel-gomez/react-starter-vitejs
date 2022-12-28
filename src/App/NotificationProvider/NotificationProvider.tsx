import { createContext, ReactNode, useMemo } from 'react';
import Notifications, { TNotification } from './Notifications';
import useNotifications from './Notifications.hook';

export type TNotificationContext = {
  addNotification?: (arg0: TNotification) => void;
};

export const NotificationContext = createContext<TNotificationContext | null>(null);
NotificationContext.displayName = 'NotificationContext';

type TNotificationProvider = {
  children: ReactNode;
  useNotificationsFn?: typeof useNotifications;
};

const NotificationProvider = ({ children, useNotificationsFn = useNotifications }: TNotificationProvider) => {
  const { addNotification, onDeleteNotification, stateNotifications } = useNotificationsFn();
  const value = useMemo(() => ({ addNotification }), [addNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {stateNotifications && stateNotifications.length > 0 && (
        <Notifications notifications={stateNotifications} deleteNotification={onDeleteNotification} />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
