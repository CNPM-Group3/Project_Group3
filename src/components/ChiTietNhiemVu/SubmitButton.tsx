"use client";
import React from "react";

interface SubmitButtonProps {
  onSubmit?: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  const handleClick = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-7 py-3.5 mt-4 max-w-full text-2xl font-bold text-center text-white whitespace-nowrap bg-teal-500 rounded-lg border-0 border border-solid w-[100px] max-md:px-5 hover:bg-teal-600 transition-colors"
    >
      Nộp
    </button>
  );
};