import React from "react";

interface ProjectCardProps {
  title: string;
  group: string;
  supervisor: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  group,
  supervisor,
}) => {
  return (
    <article className="px-4 py-3 mt-6 w-full rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:pr-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[29%] max-md:ml-0 max-md:w-full">
          <div className="flex shrink-0 mx-auto rounded-lg bg-zinc-300 h-[139px] w-[165px] max-md:mt-10" />
        </div>
        <div className="ml-5 w-[71%] max-md:ml-0 max-md:w-full">
          <div className="self-stretch my-auto text-xl text-black max-md:mt-10">
            <div>
              <strong className="text-slate-600">Tên dự án:</strong>
              <span className="text-slate-600"> {title}</span>
            </div>
            <div className="mt-5">
              <strong className="text-slate-600">Nhóm:</strong>
              <span className="text-slate-600"> {group}</span>
            </div>
            <div className="mt-5">
              <strong className="text-slate-600">Người hướng dẫn:</strong>
              <span className="text-slate-600"> {supervisor}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
