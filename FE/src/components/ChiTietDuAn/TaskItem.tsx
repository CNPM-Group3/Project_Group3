import React from "react";

interface TaskItemProps {
  name: string;
  status: "problem" | "working" | "done" | "submitted";
  iconSrc: string;
  onStatusChange: (status: "problem" | "working" | "done" | "submitted") => void;
}

const statusOptions = [
  { value: "problem", label: "Vấn đề", className: "text-red-900 bg-rose-200" },
  { value: "working", label: "Đang làm", className: "text-blue-600 bg-blue-100" },
  { value: "done", label: "Xong", className: "text-teal-700 bg-sky-200" },
  { value: "submitted", label: "Đã nộp", className: "text-amber-500 bg-yellow-100" },
];

export const TaskItem: React.FC<TaskItemProps> = ({
  name,
  status,
  iconSrc,
  onStatusChange,
}) => {
  const currentStatus = statusOptions.find(opt => opt.value === status);

  return (
    <div className="flex flex-wrap items-center px-3.5 py-2.5 mt-2.5 w-full rounded-xl border border-solid bg-slate-50 border-slate-200 min-h-20 max-md:max-w-full">
      <div className="flex grow shrink items-center self-stretch my-auto">
        <div className="flex gap-3 self-stretch my-auto">
          <div className="flex justify-between items-center min-h-[60px]">
            <img
              src={iconSrc}
              alt=""
              className="object-contain self-stretch my-auto rounded-lg aspect-square w-[60px]"
            />
          </div>
          <h3 className="my-auto text-base font-semibold text-center text-slate-600">
            {name}
          </h3>
        </div>
      </div>
      <div className="flex gap-2 ml-auto">
        <div className="relative">
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value as TaskItemProps["status"])}
            className={`appearance-none px-4 py-2 rounded-lg font-bold text-sm cursor-pointer border-2 border-transparent pr-8
              ${currentStatus?.className}
            `}
            style={{ minWidth: 110 }}
          >
            {statusOptions.map(opt => (
              <option
                key={opt.value}
                value={opt.value}
                className={opt.className}
              >
                {opt.label}
              </option>
            ))}
          </select>
          {/* Mũi tên xổ xuống */}
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};
