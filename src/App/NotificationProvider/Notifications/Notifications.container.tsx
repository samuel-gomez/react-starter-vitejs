import { getComponentClassName as getComponentClassNameFn } from '@axa-fr/react-toolkit-core';
import Notifications, { type TNotifications } from './Notifications';
import { DEFAULT_CLASS_NOTIFICATION, MODIFIER_OPEN } from './constants';

type TNotificationsContainer = Omit<TNotifications, 'notifications'> & {
  notifications?: TNotifications['notifications'];
  getComponentClassName?: typeof getComponentClassNameFn;
  NotificationsCmpt?: typeof Notifications;
};

const NotificationsContainer = ({
  className = DEFAULT_CLASS_NOTIFICATION,
  notifications = [],
  getComponentClassName = getComponentClassNameFn,
  NotificationsCmpt = Notifications,
  ...rest
}: TNotificationsContainer) => {
  const classModifier = notifications.length > 0 ? MODIFIER_OPEN : '';
  const classComponent = getComponentClassName(className, classModifier, DEFAULT_CLASS_NOTIFICATION);
  return <NotificationsCmpt {...rest} notifications={notifications} className={classComponent} />;
};

export default NotificationsContainer;
