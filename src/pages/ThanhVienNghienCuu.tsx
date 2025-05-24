"use client";
import React from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { ProjectsTable } from "@cnpm/components/TrangChuThanhVienNghienCuu/ProjectsTable";
import { Icons } from "@cnpm/components/TrangChuThanhVienNghienCuu/Icons";
import { StatsCard } from "@cnpm/components/TrangChuThanhVienNghienCuu/StatsCard";

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
							<div className="flex gap-6 max-md:flex-col max-md:gap-4">
								<ProjectsTable projects={recentProjects} />
								<aside className="px-16 py-7 bg-white rounded-xl border border-solid shadow-sm border-slate-200 h-[331px] w-[266px] max-md:w-full">
									<h2 className="pt-0.5 h-4 text-base leading-4 text-slate-500">
										Thông báo chung
									</h2>
								</aside>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default ThanhVienNghienCuu;