"use client";
import React from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";

const ThanhVienNghienCuu = () => {
	return (
		<main className="bg-slate-50 min-h-screen w-full">
			<div className="flex flex-row min-h-screen">
				{/* Sidebar */}
				<div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
					<Sidebar />
				</div>
				{/* Main content */}
				<div className="flex-1 flex flex-col ml-64">
					<div className="fixed w-full z-10">
						<Header />
					</div>
					<section className="flex flex-col items-center pb-20 w-full max-w-full">
						<div className="flex flex-col gap-6 p-6 w-full max-w-[1136px] max-md:p-4 max-md:w-full">
							<h1 className="mb-4 text-4xl font-extrabold text-gray-900 leading-tight text-center max-sm:text-3xl mt-16">
								Chào mừng bạn đến với Hệ thống Quản lý Đề tài Nghiên cứu Khoa học
							</h1>
							<p className="text-lg text-gray-700 text-center mb-12 max-sm:text-base">
								Hệ thống hỗ trợ quản lý và theo dõi các đề tài nghiên cứu khoa học. 
							</p>

							{/* Giới thiệu ứng dụng Section */}
							<section className="w-full max-w-[1136px] max-md:max-w-full mb-12">
								<div className="bg-white p-10 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-10 border border-gray-100 transition-all duration-300 hover:shadow-xl">
									<div className="md:w-1/2">
										<h2 className="text-3xl font-bold text-gray-800 mb-5">Giới thiệu ứng dụng</h2>
										<p className="text-gray-700 text-lg leading-relaxed mb-6">
											Ứng dụng được thiết kế để hỗ trợ quản lý các đề tài nghiên cứu khoa học, 
											giúp bạn dễ dàng theo dõi tiến độ, quản lý thông tin, và tương tác với các thành viên khác trong dự án.
											Giao diện thân thiện và các tính năng mạnh mẽ sẽ giúp công việc nghiên cứu của bạn hiệu quả hơn.
										</p>
										<p className="text-gray-700 text-lg leading-relaxed">
											Nền tảng này cũng cung cấp các công cụ báo cáo và phân tích, giúp người dùng có cái nhìn tổng quan về các dự án đang diễn ra và hiệu suất làm việc.
										</p>
									</div>
									<div className="md:w-1/2 flex justify-center items-center relative">
										<img
											src="https://courses.ut.edu.vn/pluginfile.php/1/theme_edly/main_logo/1749934807/logo_uth.png"
											alt="Application Overview"
											className="rounded-lg shadow-xl max-w-full h-auto transform transition-transform duration-300 hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
									</div>
								</div>
							</section>

							{/* New Content: Liên hệ */}
							<section className="w-full max-w-[1136px] max-md:max-w-full mb-12">
								<div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
									<h2 className="text-3xl font-semibold text-gray-800 mb-6">Liên hệ</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
											<div>
												<p className="text-lg font-medium text-gray-800">Email:</p>
												<p className="text-lg text-blue-600 font-semibold">support@example.com</p>
											</div>
										</div>
										<div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
												<path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.135a11.042 11.042 0 005.516 5.516l1.135-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
											</svg>
											<div>
												<p className="text-lg font-medium text-gray-800">Hotline:</p>
												<p className="text-lg text-blue-600 font-semibold">0123-456-789</p>
											</div>
										</div>
									</div>
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