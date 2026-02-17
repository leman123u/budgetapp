import React from "react";

const Button = ({ children, onClick, type = "button", disabled, className, variant = "primary" }) => {
  const baseStyles = "px-4 py-2 text-white rounded-theme font-semibold text-sm transition-all duration-200 ";
  
  const variantStyles = {
    primary: "bg-primary-main hover:bg-primary-dark shadow-sm hover:shadow-md",
    success: "bg-success-main hover:bg-success-dark shadow-sm hover:shadow-md",
    error: "bg-error-main hover:bg-error-dark shadow-sm hover:shadow-md",
    outline: "bg-transparent border-2 border-primary-main text-primary-main hover:bg-primary-light",
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseStyles + variantStyles[variant] + " " + disabledStyles + " " + (className || "")}
    >
      {children}
    </button>
  );
};

export default Button;