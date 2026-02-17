import React from "react";

const Card = ({ children, className, padding = "spacing-3" }) => {
  // Convert spacing token to actual value
  const paddingMap = {
    'spacing-1': '8px',
    'spacing-2': '16px',
    'spacing-3': '24px',
    'spacing-4': '32px',
  };
  
  const paddingValue = paddingMap[padding] || paddingMap['spacing-3'];
  
  return (
    <div 
      className={"bg-white rounded-theme " + (className || "")}
      style={{
        padding: paddingValue,
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  );
};

export default Card;