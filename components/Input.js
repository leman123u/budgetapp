import React from "react";

const Input = ({ label, type="text", value, onChange, placeholder, required, className }) => {
  return (
    <div className="flex flex-col mb-3">
      {label && (
        <label className="mb-2 font-medium text-sm text-grey-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={
          "px-4 py-2.5 border border-grey-300 rounded-theme-sm " +
          "focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main " +
          "transition-all duration-200 text-sm " +
          "placeholder:text-grey-400 " +
          (className || "")
        }
      />
    </div>
  );
};

export default Input;