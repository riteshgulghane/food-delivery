import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ variant, children, ...props }) => {
  const baseStyle = 'w-full px-4 py-3 button';

  const variantStyle = variant === 'primary' ? 'primary-button' : 'secondary-button';

  return (
    <button {...props} className={`${baseStyle} ${variantStyle}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
