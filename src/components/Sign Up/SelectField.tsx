"use client";
import React from "react";

interface SelectFieldProps {
  placeholder: string;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  className = "",
}) => {
  return (
    <div
      className={`w-full text-base leading-none text-gray-400 min-h-[55px] ${className}`}
    >
      <div className="flex flex-1 gap-2 items-center py-3 pr-3 pl-4 border border-solid border-[color:var(--sds-color-border-default-default)] rounded-[var(--sds-size-radius-200)] bg-[color:var(--sds-color-background-default-default)]">
        <span className="flex-1 shrink self-stretch my-auto basis-0">
          {placeholder}
        </span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/5faa2695224be6846b4de3f2f7070ce29918d421?placeholderIfAbsent=true"
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          alt="Select dropdown"
        />
      </div>
    </div>
  );
};
