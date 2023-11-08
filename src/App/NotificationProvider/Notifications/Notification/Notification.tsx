import Alert, { AlertCoreProps } from '@axa-fr/react-toolkit-alert/dist/esm/index';
import { ALERT_ICON, ALERT_TYPE } from '../constants';

export type TType = keyof typeof ALERT_TYPE;

export type TNotification = {
  id: string;
  label: string;
  onClose?: AlertCoreProps['onClose'];
  detail?: string;
  classModifier?: string;
  type?: TType;
};

const Notification = ({ id, label, onClose, detail = '', classModifier = '', type = ALERT_TYPE.error }: TNotification) => (
  <Alert key={id} icon={ALERT_ICON[type]} title={label} classModifier={`notification ${classModifier}`} onClose={onClose}>
    {detail && <p>{detail}</p>}
  </Alert>
);

export default Notification;
