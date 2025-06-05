import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 border-2 border-neutral-gray-light rounded-md"
        style={{
          borderColor: "var(--neutral-gray-light)",
        }}
      />
      <span className="text-sm leading-5">{label}</span>
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
