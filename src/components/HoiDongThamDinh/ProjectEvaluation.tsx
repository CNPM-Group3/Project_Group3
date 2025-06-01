"use client";

import React, { useState } from "react";

type EvaluationOption = "good" | "average" | "poor";

interface Criterion {
  id: string;
  label: string;
}

interface ProjectEvaluationProps {
  criteria: Criterion[];
  selections: Record<string, EvaluationOption | null>;
  onSelect: (criterionId: string, value: EvaluationOption) => void;
}

const CRITERIA: Criterion[] = [
  { id: "planning", label: "Lập kế hoạch" },
  { id: "execution", label: "Thực hiện" },
  { id: "effectiveness", label: "Hiệu quả" },
];

const statusColors = {
  good: "bg-emerald-200 text-black",
  average: "bg-yellow-200 text-black",
  poor: "bg-rose-300 text-black",
  base: "bg-gray-100 text-gray-600 hover:bg-gray-200",
};

const ProjectEvaluation: React.FC = () => {
  const [selections, setSelections] = useState<Record<string, EvaluationOption | null>>({
    planning: null,
    execution: null,
    effectiveness: null,
  });

  const handleSelect = (criterionId: string, value: EvaluationOption) => {
    setSelections((prev) => ({ ...prev, [criterionId]: value }));
  };

  return (
    <section className="bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-10 text-base text-gray-800 max-md:px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {CRITERIA.map((criterion) => (
          <div
            key={criterion.id}
            className="flex items-center justify-between gap-6 min-h-[56px]"
          >
            {/* Label trái */}
            <span className="text-gray-700 w-[40%] font-medium">
              {criterion.label}
            </span>

            {/* Nút chọn phải */}
            <div className="flex gap-4 w-[60%] justify-end">
              {(["good", "average", "poor"] as EvaluationOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(criterion.id, option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                    selections[criterion.id] === option
                      ? statusColors[option]
                      : statusColors.base
                  }`}
                >
                  {option === "good"
                    ? "Tốt"
                    : option === "average"
                    ? "Trung bình"
                    : "Kém"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectEvaluation;