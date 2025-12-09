import React from "react";

function Input({
  value,
  onChange,
  placeholder = "Enter text...",
  type = "text",
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1 w-full">

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 ${className}`}
      />
    </div>
  );
}

export default Input;
