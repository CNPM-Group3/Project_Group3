"use client";
import React, { useState } from "react";

interface DatePickerProps {
  label: string;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="flex flex-wrap gap-7 mt-9 max-w-full w-[605px]">
      <label className="flex-auto my-auto text-xl font-bold text-slate-600">
        {label}
      </label>

      <div className="w-[450px]">
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="block w-full px-4 py-2 text-base leading-6 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="mm/dd/yyyy"
          />
        </div>
      </div>
    </div>
  );
};