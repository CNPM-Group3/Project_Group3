import React from "react";

interface TaskDetailsProps {
  deadline?: string;
  content?: string;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({
  deadline = "24/05/2025 23:30",
  content = "Nội dung nhiệm vụ chưa được cập nhật.",
}) => {
  return (
    <section className="flex flex-col items-start px-5 pt-6 pb-60 w-full text-xl font-bold rounded-xl border border-solid border-slate-200 max-w-[1098px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:pb-24 max-md:max-w-full">
      <div className="ml-3.5 text-gray-700 max-md:ml-2.5">
        Thời hạn: <span className="font-normal">{deadline}</span>
      </div>
      <div className="shrink-0 self-stretch mt-6 h-px border border-gray-300 border-solid max-md:max-w-full" />
      <div className="mt-6 mb-0 ml-3.5 text-slate-600 max-md:mb-2.5 max-md:ml-2.5">
        Nội dung nhiệm vụ:
      </div>
      <div className="ml-3.5 font-normal text-slate-600 max-md:ml-2.5">
        {content}
      </div>
    </section>
  );
};