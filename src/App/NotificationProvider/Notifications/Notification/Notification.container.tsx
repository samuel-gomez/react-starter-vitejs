import { ALERT_TYPE } from '../constants';
import Notification, { type TNotification } from './Notification';

type TNotificationContainer = TNotification & {
  NotificationCmpt?: typeof Notification;
};

const NotificationContainer = ({ classModifier = '', type = ALERT_TYPE.error, NotificationCmpt = Notification, ...rest }: TNotificationContainer) => {
  const newClassModifier = [type, classModifier].join(' ').trim();
  return <NotificationCmpt {...rest} type={type} classModifier={newClassModifier} />;
};

export default NotificationContainer;
