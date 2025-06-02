"use client";
import React from "react";

interface FormInputProps {
  label?: string;
  placeholder: string;
  type?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
  className = "",
  value,
  onChange,
}) => {
  return (
    <div className={`w-full min-h-[74px] ${className}`}>
      {label && (
        <label className="pb-2.5 block w-full text-sm font-bold text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-base leading-6 text-gray-400 bg-white rounded-lg border border-gray-300 border-solid"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
