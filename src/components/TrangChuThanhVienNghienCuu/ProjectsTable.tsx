// src/components/TrangChuThanhVienNghienCuu/ProjectsTable.tsx
import React from "react";

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

const getProgressColor = (progress: number) => {
	if (progress >= 80) return "bg-green-500";
	if (progress >= 60) return "bg-blue-500";
	if (progress >= 40) return "bg-yellow-500";
	return "bg-red-500";
};

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
	return (
		<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
			<div className="px-6 py-5 border-b border-slate-100">
				<h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
					<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
					Dự án gần đây
				</h2>
			</div>
			
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="bg-slate-50">
							<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 border-b border-slate-200">
								Tiêu đề dự án
							</th>
							<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 border-b border-slate-200">
								Nhóm
							</th>
							<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 border-b border-slate-200">
								Người hướng dẫn
							</th>
							<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 border-b border-slate-200">
								Tiến độ
							</th>
							<th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 border-b border-slate-200">
								Hành động
							</th>
						</tr>
					</thead>
					<tbody>
						{projects.map((project, index) => (
							<tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
								<td className="py-5 px-6 border-b border-slate-100">
									<div className="font-semibold text-gray-800 text-base">
										{project.title}
									</div>
									<div className="text-sm text-gray-500 mt-1">
										Cập nhật 2 giờ trước
									</div>
								</td>
								<td className="py-5 px-6 border-b border-slate-100">
									<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
										{project.group}
									</span>
								</td>
								<td className="py-5 px-6 border-b border-slate-100">
									<div className="flex items-center gap-3">
										<img
											src={project.instructor.avatar}
											alt={project.instructor.name}
											className="w-10 h-10 rounded-full border-2 border-white shadow-md"
										/>
										<div>
											<div className="font-medium text-gray-800">
												{project.instructor.name}
											</div>
											<div className="text-sm text-gray-500">
												Giảng viên
											</div>
										</div>
									</div>
								</td>
								<td className="py-5 px-6 border-b border-slate-100">
									<div className="flex items-center gap-3">
										<div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
											<div
												className={`h-full ${getProgressColor(project.progress)} transition-all duration-300`}
												style={{ width: `${project.progress}%` }}
											></div>
										</div>
										<span className="font-semibold text-gray-700 min-w-[50px]">
											{project.progress}%
										</span>
									</div>
								</td>
								<td className="py-5 px-6 border-b border-slate-100">
									<button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-150">
										Xem chi tiết
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};