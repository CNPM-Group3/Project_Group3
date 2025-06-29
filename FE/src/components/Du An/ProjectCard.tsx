import React from "react";

interface ProjectCardProps {
  title: string;
  group: string;
  supervisor: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  supervisor,
}) => {
  return (
    <article className="p-6 w-full rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-6 items-center">
        {/* Image placeholder */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-300 opacity-50"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold text-slate-700 whitespace-nowrap">Tên dự án:</span>
              <span className="text-slate-600 font-medium">{title}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              {/* <span className="font-semibold text-slate-700 whitespace-nowrap">Nhóm:</span> */}
              {/* <span className="text-slate-600">{group}</span> */}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-start gap-1">
              <span className="font-semibold text-slate-700 whitespace-nowrap">Mô tả:</span>
              <span className="text-slate-600">{supervisor}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};