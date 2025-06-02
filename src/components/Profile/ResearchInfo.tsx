import React from "react";

interface ResearchInfoProps {
  role: string;
  researchArea: string;
  projectCount: number;
  githubLink?: string; // Optional prop
}

export const ResearchInfo: React.FC<ResearchInfoProps> = ({
  role,
  researchArea,
  projectCount,
  githubLink,
}) => {
  return (
    <section className="flex flex-col grow px-14 py-16 text-gray-700 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-center text-xl font-bold text-center">
        Thông tin nghiên cứu
      </h2>

      <div className="flex flex-col mt-10 text-sm">
        <p>
          <strong className="text-gray-700">Vai trò:</strong>
          <span className="text-gray-700"> {role}</span>
        </p>

        <p className="self-start mt-3.5 text-center">
          <strong className="text-gray-700">Lĩnh vực nghiên cứu:</strong>
          <span className="text-gray-700"> {researchArea}</span>
        </p>

        <p className="mt-3.5">
          <strong className="text-gray-700">Số dự án:</strong>
          <span className="text-gray-700"> {projectCount}</span>
        </p>

        <p className="mt-3.5">
          <strong className="text-gray-700">Link Github:</strong>
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
              {githubLink}
            </a>
          )}
        </p>
      </div>
    </section>
  );
};
