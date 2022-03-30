import { showNotification } from '@mantine/notifications';
import { NotificationType } from './types/miskTypes';

export const notification = ({
  title,
  message,
  color,
  icon = null,
}: NotificationType) => {
  if (icon) {
    showNotification({
      id: 'notification',
      autoClose: 3000,
      title: title,
      message: message,
      color: color,
      radius: 'md',
      icon: icon,
    });
  } else {
    showNotification({
      id: 'notification',
      autoClose: 3000,
      title: title,
      message: message,
      color: color,
      radius: 'md',
    });
  }
};
