import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ icon, ...props }) => {
  return (
    <div className="relative">
      {props.label && (
        <label htmlFor={props.id} className="block text-gray-700 font-bold mb-2">
          {props.label}
        </label>
      )}
      <div className="relative">
        <input
          className="h-11 w-full border border-neutral-gray-light rounded-lg box-border p-3 text-sm leading-5"
          style={{
            borderColor: 'var(--neutral-gray-light)',
          }}
          {...props}
        />
        {icon && (
          <span
            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
            onClick={icon.onClick}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  icon: PropTypes.element,
};

export default Input;
