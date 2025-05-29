import React from "react";
import { ProjectListItem } from "./ProjectListItem";

export interface Project {
  id: string;
  name: string;
  proposer: string;
  date: string;
}

interface ProjectListProps {
  projects: Project[];
  actionType?: "approve" | "reject" | "both";
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, actionType = "both" }) => {
  return (
    <section className="pt-2.5 pb-7 mt-1.5 w-full max-md:max-w-full bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center text-base font-semibold text-center text-gray-700 max-md:max-w-full">
        <div className="overflow-hidden grow shrink self-stretch px-10 py-4 my-auto whitespace-nowrap w-[81px] max-md:px-5">
          Mã
        </div>
        <div className="overflow-hidden grow shrink self-stretch px-16 py-4 my-auto min-w-60 w-[334px] max-md:px-5">
          Tên dự án
        </div>
        <div className="overflow-hidden grow shrink self-stretch px-8 py-4 my-auto w-[179px] max-md:px-5">
          Tên người đề xuất
        </div>
        <div className="overflow-hidden grow shrink self-stretch px-12 py-4 my-auto whitespace-nowrap w-[119px] max-md:px-5">
          Ngày
        </div>
        <div className="overflow-hidden grow shrink self-stretch px-1 py-4 my-auto w-20">
          Xem chi tiết
        </div>
        <div className="overflow-hidden grow shrink self-stretch px-16 py-4 my-auto w-[184px] max-md:px-5">
          Hành động
        </div>
      </div>
      <hr className="z-10 shrink-0 h-px border border-solid max-md:max-w-full" />
      {/* Nội dung có thanh trượt */}
      <div className="overflow-y-auto min-h-[300px] max-h-[400px]">
        {projects.map((project: Project) => (
          <ProjectListItem key={project.id} {...project} actionType={actionType} />
        ))}
      </div>
    </section>
  );
};
