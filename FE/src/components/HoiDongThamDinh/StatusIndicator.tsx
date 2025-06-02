"use client";

import React from "react";

interface StatusIndicatorProps {
  status: "good" | "average" | "poor";
  label: string;
  showIcon?: boolean;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showIcon = false,
  className = "",
}) => {
  // Màu nền rõ hơn để hiển thị dễ nhìn hơn
  const getStatusStyles = () => {
    switch (status) {
      case "good":
        return "bg-emerald-300";
      case "average":
        return "bg-yellow-300";
      case "poor":
        return "bg-rose-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <div
        className={`h-[23px] w-[23px] rounded-full ${getStatusStyles()}`}
      />
      <span className="text-sm text-gray-700">{label}</span>
      {showIcon && (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/40274b722d9dbb54ac71371c7a7ba0ebfb894b86?placeholderIfAbsent=true"
          className="w-5 h-5 object-contain"
          alt="status icon"
        />
      )}
    </div>
  );
};

export default StatusIndicator;
