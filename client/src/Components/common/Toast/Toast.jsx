import React from 'react';
import PropTypes from 'prop-types';

import './Toast.css';

export const ToastTypes = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
};

const ToastIcon = {
  [ToastTypes.INFO]: '/assets/icons/info.svg',
  [ToastTypes.WARNING]: '/assets/icons/warning.svg',
  [ToastTypes.ERROR]: '/assets/icons/error.svg',
  [ToastTypes.SUCCESS]: '/assets/icons/success.svg',
};

const Toast = ({ message, type, className, ...rest }) => (
  <div className={`toast flex items-center gap-2 ${className}`} {...rest}>
    {/* <img src={ToastIcon[type]} alt={type} /> */}
    <h2 className="toast-message">{message}</h2>
  </div>
);

Toast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
};

Toast.defaultProps = {
  type: ToastTypes.INFO,
  message: 'Oops! Seems like something is broken. Please check after some time.',
};

export default Toast;
