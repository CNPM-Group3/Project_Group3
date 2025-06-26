// src/components/TrangChuThanhVienNghienCuu/TaskList.tsx
import React from "react";

interface TaskProps {
	title: string;
	status: string;
}

const tasks: TaskProps[] = [
	{ title: "Nhiệm vụ 1", status: "Xong" },
	{ title: "Nhiệm vụ 2", status: "Vấn đề" },
	{ title: "Nhiệm vụ 3", status: "Đang làm" },
	{ title: "Nhiệm vụ 4", status: "Xong" },
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "Xong":
			return "bg-green-100 text-green-800 border-green-200";
		case "Vấn đề":
			return "bg-red-100 text-red-800 border-red-200";
		case "Đang làm":
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

export const TaskList = () => {
	return (
		<div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full">
			<div className="p-6 border-b border-slate-100">
				<h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
					<div className="w-2 h-2 bg-teal-500 rounded-full"></div>
					Nhiệm vụ của tôi
				</h2>
			</div>
			
			<div className="p-6 space-y-4 max-h-96 overflow-y-auto">
				{tasks.map((task, index) => (
					<div key={index} className="group">
						<div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-200 group-hover:border-slate-300">
							<div className="flex items-center gap-4">
								<div className="relative">
									<div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
										<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									</div>
								</div>
								<div>
									<h3 className="font-semibold text-gray-800 text-lg">
										{task.title}
									</h3>
									<p className="text-sm text-gray-500 mt-1">
										Được giao hôm qua
									</p>
								</div>
							</div>
							
							<div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(task.status)}`}>
								{task.status}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};