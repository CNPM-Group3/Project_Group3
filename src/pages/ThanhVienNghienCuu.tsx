"use client";
import React from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { ProjectsTable } from "@cnpm/components/TrangChuThanhVienNghienCuu/ProjectsTable";
import { Icons } from "@cnpm/components/TrangChuThanhVienNghienCuu/Icons";
import { StatsCard } from "@cnpm/components/TrangChuThanhVienNghienCuu/StatsCard";
import { TaskList } from "@cnpm/components/TrangChuThanhVienNghienCuu/TaskList";

const recentProjects = [
	{
		title: 'Hệ thống giao dịch tự động',
		group: 'CNTT22',
		instructor: {
			name: 'Ths. Hồng',
			avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0784ece3d4d4e2c6679bf3be59f520b4edac9fba?placeholderIfAbsent=true'
		},
		progress: 40
	},
	{
		title: 'Bác Sĩ AI',
		group: 'CNTT3',
		instructor: {
			name: 'TS. Minh',
			avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9a9425fde5081aecab155e608fb2add02f6e1233?placeholderIfAbsent=true'
		},
		progress: 60
	},
	{
		title: 'Ứng dụng Quản lý tiển trọ',
		group: 'KHDL',
		instructor: {
			name: 'TS. Ngọc',
			avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b760e890be031f90a7c0299e3136fa45f633b532?placeholderIfAbsent=true'
		},
		progress: 80
	}
];

const thongBaoChung = [
	{ message: "Nhiệm vụ 1 sắp tới hạn !" },
	{ message: "Bạn vừa mới được ThS Nguyễn Văn Hồng cập nhật nhiệm vụ 3" },
];

export const ThanhVienNghienCuu = () => {
	return (
		<main className="bg-slate-50 min-h-screen w-full">
			<div className="flex flex-row min-h-screen">
				{/* Sidebar */}
				<div className="w-[18%] border-r border-slate-200 bg-gray">
					<Sidebar />
				</div>
				{/* Main content */}
				<div className="w-[82%] flex flex-col">
					<Header />
					<section className="flex flex-col items-center pb-20 w-full max-w-full">
						<div className="flex flex-col gap-6 p-6 w-full max-w-[1136px] max-md:p-4 max-md:w-full">
							<h1 className="mb-6 text-3xl text-black max-sm:text-2xl">
								Xin chào, tên !
							</h1>
							<section className="inline-flex gap-6 items-center mb-6 max-md:flex-wrap max-md:gap-4 max-sm:flex-col max-sm:gap-3">
								<StatsCard
									title="Dự án"
									value={10}
									icon={<Icons.Projects />}
								/>
								<StatsCard
									title="Chờ Duyệt"
									value={2}
									icon={<Icons.Clock />}
								/>
								<StatsCard
									title="Đã duyệt"
									value={10}
									icon={<Icons.Checkmark />}
									showViewDetails={false}
								/>
								<StatsCard
									title="Yêu cầu tài trợ"
									value={4}
									icon={<Icons.User />}
								/>
							</section>
							<section className="w-full max-w-[1136px] max-md:max-w-full">
								<h2 className="text-xl font-semibold text-gray-700 mb-4"></h2>
								<div className="flex gap-6 max-md:flex-col max-md:gap-4" style={{ height: 340 }}>
									<div className="flex-1 h-full">
										<div className="h-full overflow-y-auto pr-2">
											<TaskList />
										</div>
									</div>
									<aside className="px-6 py-4 bg-white rounded-xl border border-solid shadow-sm border-slate-200 w-[266px] max-md:w-full flex flex-col h-full">
										<h2 className="pt-0.5 h-4 text-base leading-4 text-slate-500 mb-4 font-semibold">
											Thông báo chung
										</h2>
										<div className="flex flex-col gap-3 h-full overflow-y-auto pr-2">
											{thongBaoChung.map((tb, idx) => (
												<div
													key={idx}
													className="flex items-start gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100"
												>
													<span className="mt-0.5 text-sky-500">
														{/* Icon thông báo */}
														<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
															<path stroke="currentColor" strokeWidth="2" d="M12 8v4m0 4h.01"/>
														</svg>
													</span>
													<span className="text-sm text-slate-700">{tb.message}</span>
												</div>
											))}
										</div>
									</aside>
								</div>
							</section>
							<section className="w-full max-w-[1136px] max-md:max-w-full mt-8">
								<div className="flex gap-6 max-md:flex-col max-md:gap-4">
									<ProjectsTable projects={recentProjects} />
								</div>
							</section>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default ThanhVienNghienCuu;