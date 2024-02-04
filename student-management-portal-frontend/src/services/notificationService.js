import { notification } from "antd";

class NotificationService {

  constructor() { }

  openNotification = (type, message, description) => {
    notification.destroy();
    notification[type]({
      message: message,
      description: description,
      placement: "bottomRight"
    });
  };

  success = (message, description) => {
    this.openNotification('success', message, description);
  };

  error = (message, description) => {
    this.openNotification('error', message, description);
  };

  info = (message, description) => {
    this.openNotification('info', message, description);
  };

  warning = (message, description) => {
    this.openNotification('warning', message, description);
  };
}

export default new NotificationService();