import React from 'react';

import './ToastNotification.css';
import Toast from '../Toast/Toast';
import { ToastTypes } from '../Toast/Toast';

const ToastNotification = ({
  props = { message: '', type: ToastTypes.INFO, toastId: 0 },
  children,
}) => {
  const [notifications, setNotifications] = React.useState([]);
  const notificationTimeout = React.useRef(null);

  React.useEffect(() => {
    if (props?.message) {
      setNotifications(prev => [...prev, props]);
      notificationTimeout.current = setTimeout(() => {
        setNotifications(prev => prev.filter((_, index) => index !== 0));
      }, 3000);
    }

    return () => {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
    };
  }, [props.toastId]);

  return (
    <>
      {notifications.length > 0 && (
        <div className="toast-container">
          {notifications.map((notification, index) => (
            <Toast
              key={index}
              message={notification?.message}
              type={notification?.type}
              className="error-toast"
            />
          ))}
        </div>
      )}
      {children}
    </>
  );
};

export default ToastNotification;
