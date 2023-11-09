import './Notifications.scss';
import { ALERT_TYPE, DEFAULT_CLASS_NOTIFICATION } from './constants';
import Notification, { type TNotification } from './Notification';
import type { TonDeleteNotification } from '..';

export type TNotifications = {
  className?: string;
  notifications: TNotification[];
  deleteNotification: TonDeleteNotification;
};

const Notifications = ({ notifications, deleteNotification, className = DEFAULT_CLASS_NOTIFICATION }: TNotifications) => (
  <aside className={className}>
    {notifications.map(({ id, label, type = ALERT_TYPE.error, classModifier, ...rest }) => (
      <Notification {...rest} key={id} id={id} label={label} type={type} classModifier={classModifier} onClose={() => deleteNotification?.(id)} />
    ))}
  </aside>
);

export default Notifications;
