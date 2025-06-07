"use client";
import React, { useState } from "react";

interface PresentationFormProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const PresentationForm: React.FC<PresentationFormProps> = ({
  value,
  onChange,
  label = "Trình bày :",
  placeholder = "Nhập nội dung trình bày...",
}) => {
  const [internalValue, setInternalValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const displayValue = value !== undefined ? value : internalValue;

  return (
    <section className="z-10 pb-8 mt-3 w-full text-xl font-bold bg-black bg-opacity-0 max-w-[1098px] text-slate-600 max-md:max-w-full">
      <label className="py-1 max-w-full bg-black bg-opacity-0 w-[704px] max-md:pr-5 block">
        {label}
      </label>
      <textarea
        value={displayValue}
        onChange={handleChange}
        className="flex shrink-0 bg-white rounded-md border border-gray-300 border-solid h-[77px] max-md:max-w-full w-full p-3 resize-none"
        placeholder={placeholder}
      />
    </section>
  );
};