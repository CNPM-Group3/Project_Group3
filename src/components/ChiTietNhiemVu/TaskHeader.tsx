import React from "react";

interface TaskHeaderProps {
  projectName?: string;
  taskName?: string;
  iconUrl?: string;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
  projectName = "Tên dự án",
  taskName = "Nhiệm vụ 1",
  iconUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/4009dff95255aa53a2b4ee445dcfe42f484713dd?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
}) => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="mt-8 text-3xl font-bold text-gray-700">{projectName}</h1>
      <div className="shrink-0 mt-7 max-w-full h-px border border-gray-300 border-solid w-[1061px]" />
      <div className="flex flex-wrap gap-3 items-center px-3.5 py-2.5 mt-3 w-full rounded-xl bg-slate-50 max-w-[1053px] min-h-20 max-md:max-w-full">
        <div className="flex justify-between items-center self-stretch my-auto min-h-[60px] w-[60px]">
          <img
            src={iconUrl}
            alt="Task icon"
            className="object-contain self-stretch my-auto rounded-lg aspect-square w-[60px]"
          />
        </div>
        <h2 className="self-stretch my-auto text-2xl font-semibold text-center text-slate-600">
          {taskName}
        </h2>
      </div>
    </section>
  );
};