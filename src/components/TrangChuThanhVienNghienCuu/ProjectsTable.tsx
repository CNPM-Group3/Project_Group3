interface Instructor {
  name: string;
  avatar: string;
}

interface Project {
  title: string;
  group: string;
  instructor: Instructor;
  progress: number;
}

interface ProjectsTableProps {
  projects: Project[];
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
  return (
    <section className="bg-white rounded-xl border border-solid shadow-sm border-slate-200 h-[331px] w-[1100px] max-md:w-full">
      <header className="px-6 py-0 w-full text-lg font-semibold leading-5 text-black border-b border-solid border-b-slate-200 h-[77px] flex items-center">
        <h2>Dự án gần đây</h2>
      </header>
      <div className="p-6 max-sm:overflow-x-auto">
        <table className="w-full border-collapse max-sm:min-w-[600px]">
          <thead>
            <tr>
              <th className="pt-px pr-0 pb-4 pl-px text-base font-medium text-left border-b border-solid border-b-slate-200 text-slate-500">
                Tiêu đề
              </th>
              <th className="pt-px pr-0 pb-4 pl-px text-base font-medium text-left border-b border-solid border-b-slate-200 text-slate-500">
                Nhóm
              </th>
              <th className="pt-px pr-0 pb-4 pl-px text-base font-medium text-left border-b border-solid border-b-slate-200 text-slate-500">
                Người hướng dẫn
              </th>
              <th className="pt-px pr-0 pb-4 pl-px text-base font-medium text-left border-b border-solid border-b-slate-200 text-slate-500">
                Tiến độ
              </th>
              <th className="pt-px pr-0 pb-4 pl-px text-base font-medium text-left border-b border-solid border-b-slate-200 text-slate-500" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="table-row border-b border-solid border-b-slate-100">
                <td className="px-px pt-5 pb-5 text-sm text-black align-middle">
                  {project.title}
                </td>
                <td className="px-px pt-5 pb-5 text-sm text-black align-middle">
                  {project.group}
                </td>
                <td className="table-cell px-px pt-5 pb-5 text-sm text-black align-middle">
                  <div className="flex gap-2 items-center">
                    <img
                      src={project.instructor.avatar}
                      alt={project.instructor.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm leading-4 text-black">
                      {project.instructor.name}
                    </span>
                  </div>
                </td>
                <td className="px-px pt-5 pb-5 text-sm text-black align-middle">
                  {project.progress}%
                </td>
                <td className="table-cell px-px pt-5 pb-5 text-sm text-black align-middle" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
