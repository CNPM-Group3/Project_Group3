"use client";

import React, { useState } from "react";

type PhaseStatusType = "completed" | "in-progress" | "not-started";

interface PhaseStatus {
  phase: string;
  status: PhaseStatusType;
}

interface PhaseProgressProps {
  phases: PhaseStatus[];
  onPhaseStatusChange: (index: number, newStatus: PhaseStatusType) => void;
}

const statusOptions: Record<PhaseStatusType, { text: string; bg: string; icon: string }> = {
  completed: {
    text: "Hoàn Thành",
    bg: "bg-emerald-300",
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/8b98aeff18797f45569e8536ad1c37ed402f4276?placeholderIfAbsent=true",
  },
  "in-progress": {
    text: "Đang thực hiện",
    bg: "bg-yellow-300",
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/dbd1e3dfcb2a72321254ca452254c2d280ffc3c3?placeholderIfAbsent=true",
  },
  "not-started": {
    text: "Chưa bắt đầu",
    bg: "bg-rose-300",
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/467d769626ecc4b4470459ea68ac3ebf8a893038?placeholderIfAbsent=true",
  },
};

const PhaseProgress: React.FC = () => {
  const [phases, setPhases] = useState<PhaseStatus[]>([
    { phase: "Giai đoạn 1", status: "completed" },
    { phase: "Giai đoạn 2", status: "in-progress" },
    { phase: "Giai đoạn 3", status: "not-started" },
  ]);

  const handleChange = (index: number, newStatus: PhaseStatusType) => {
    const newPhases = [...phases];
    newPhases[index].status = newStatus;
    setPhases(newPhases);
  };

  return (
    <div className="px-6 py-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const { icon, text, bg } = statusOptions[phase.status];
          return (
            <div key={index} className="flex items-center justify-between gap-4">
              {/* Giai đoạn */}
              <span className="text-base font-medium text-gray-800 whitespace-nowrap w-[120px]">
                {phase.phase}
              </span>

              {/* Chọn trạng thái */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${bg} min-w-[230px]`}>
                <img src={icon} alt={text} className="w-5 h-5 object-contain" />
                <select
                  value={phase.status}
                  onChange={(e) => handleChange(index, e.target.value as PhaseStatusType)}
                  className="bg-transparent text-sm font-medium text-black outline-none flex-1"
                >
                  {Object.entries(statusOptions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhaseProgress;