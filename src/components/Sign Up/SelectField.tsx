"use client";
import React, { ChangeEvent } from "react";

interface SelectFieldProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className={`w-full min-h-[55px] ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 text-base leading-6 text-gray-700 bg-white rounded-lg border border-gray-300 border-solid outline-none focus:ring-2 focus:ring-blue-400"
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
