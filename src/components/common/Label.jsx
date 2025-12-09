import React from "react";

function Label({ children, className }) {
  return (
    <label className={`text-sm font-medium text-gray-300 ${className}`}>
      {children}
    </label>
  );
}

export default Label;
