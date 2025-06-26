// FormField.tsx
import React from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-black bg-opacity-0 ${className}`}>
      <label className="py-1 text-sm font-bold text-gray-700 bg-black bg-opacity-0 max-md:pr-5 block">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
};