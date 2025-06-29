"use client";
import * as React from "react";

interface TimeFilterProps {
  timeRanges: string[];
  selectedTimeRange: string | null;
  onSelectTimeRange: (timeRange: string) => void;
  className?: string;
  disabled?: boolean;
  onChange?: (timeRange: string) => void;
  defaultValue?: string;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({
  timeRanges,
  selectedTimeRange,
  onSelectTimeRange,
  className = "",
  disabled = false,
  onChange,
  defaultValue
}) => {
  const handleTimeRangeSelect = (range: string) => {
    if (!disabled) {
      onSelectTimeRange(range);
      onChange?.(range);
    }
  };

  return (
    <div className={`flex items-center gap-5 px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm font-medium text-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="flex items-center gap-2 text-slate-500">
        <span>Thời gian</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab69d73d717cbc6050076b3bf3e3e159135cde2"
          alt="icon"
          className="w-4 h-4 object-contain"
        />
      </div>
      <div className="flex gap-4">
        {timeRanges.map((range) => (
          <button
            key={range}
            className={`hover:text-blue-600 transition-colors duration-200 ${
              selectedTimeRange === range ? 'text-blue-600 font-semibold' : ''
            } ${disabled ? 'cursor-not-allowed' : ''}`}
            onClick={() => handleTimeRangeSelect(range)}
            disabled={disabled}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};