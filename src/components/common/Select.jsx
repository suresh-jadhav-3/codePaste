import React from "react";
import ReactSelect from "react-select";

function Select({ value, onChange, options = [], className = "" }) {
  const formattedOptions = options.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  const selectedOption =
    formattedOptions.find((o) => o.value === value) || null;

  return (
    <ReactSelect
      className={className}
      classNamePrefix="select"
      value={selectedOption}
      onChange={(selected) => onChange(selected ? selected.value : null)}
      options={formattedOptions}
      isSearchable={true}
      isClearable={true}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#0f172a",
          borderColor: "#475569",
          padding: "4px",
        }),
        input: (base) => ({
          ...base,
          color: "white", 
        }),
        singleValue: (base) => ({
          ...base,
          color: "white",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#1e293b",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#334155" : "#1e293b",
          color: "white",
        }),
      }}
    />
  );
}

export default Select;
