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

interface PresentationProps {
  title?: string;
  content?: string;
  attachments?: Array<{
    name: string;
    url: string;
  }>;
}

export const Presentation: React.FC<PresentationProps> = ({
  title = 'Presentation',
  content = 'No content available',
  attachments = []
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      
      <div className="prose max-w-none">
        <p className="text-gray-700">{content}</p>
      </div>

      {attachments.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments:</h3>
          <ul className="space-y-2">
            {attachments.map((attachment, index) => (
              <li key={index} className="flex items-center">
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {attachment.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Presentation;