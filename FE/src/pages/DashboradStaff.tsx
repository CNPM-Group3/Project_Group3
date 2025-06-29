// src/pages/ThanhVienNghienCuu.tsx
"use client";
import React from "react";
import Sidebar from "@cnpm/components/Admin/Sidebar1";
import Header from "@cnpm/components/Header";

export const nhanvien = () => {
	return (
		<main className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen w-full">
			<div className="flex flex-row min-h-screen">
				{/* Sidebar */}
				<div className="w-[18%] border-r border-slate-200 bg-gray">
					<Sidebar />
				</div>
				
				{/* Main content */}
				<div className="w-[110%] flex flex-col">
					<Header />
					
					<section className="flex-1 overflow-y-auto">
						<div className="max-w-7xl mx-auto px-8 py-12">
							{/* Welcome Header with Enhanced Spacing */}
							<div className="text-center mb-20 py-16 px-8">
								<div className="relative">
									{/* Background decorative elements */}
									<div className="absolute inset-0 flex items-center justify-center opacity-10">
										<div className="w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-3xl"></div>
									</div>
									<div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 opacity-20 blur-2xl"></div>
									<div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-2xl"></div>
									
									{/* Main content */}
									<div className="relative z-10">
										<h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent mb-8 leading-tight">
											Chào mừng bạn đến với
										</h1>
										<h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
											hệ thống nghiên cứu khoa học SRPM
										</h1>
										<p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
											Nền tảng hỗ trợ nghiên cứu và phát triển các dự án khoa học công nghệ hiện đại
										</p>
									</div>
								</div>
							</div>

							{/* Introduction Section with Enhanced Design */}
							<div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 mb-12 overflow-hidden hover:shadow-3xl transition-all duration-500">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
									{/* Text Content */}
									<div className="p-12 lg:p-16 flex flex-col justify-center">
										<div className="mb-8">
											<div className="inline-block p-3 bg-blue-100 rounded-2xl mb-6">
												<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
											</div>
											<h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
												Về Hệ Thống Nghiên Cứu
											</h2>
											<p className="text-gray-600 leading-relaxed mb-6 text-lg">
												Hệ thống nghiên cứu khoa học của chúng tôi là nền tảng tiên tiến, 
												được thiết kế để hỗ trợ các nhà nghiên cứu, sinh viên và giảng viên 
												trong việc quản lý, theo dõi và phát triển các dự án nghiên cứu.
											</p>
											<p className="text-gray-600 leading-relaxed text-lg">
												Với giao diện thân thiện và các tính năng mạnh mẽ, chúng tôi cam kết 
												mang đến trải nghiệm tốt nhất cho cộng đồng nghiên cứu.
											</p>
										</div>
										
										<div className="flex flex-wrap gap-4">
											<span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
												Quản lý dự án
											</span>
											<span className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
												Theo dõi tiến độ
											</span>
											<span className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
												Hợp tác nhóm
											</span>
										</div>
									</div>
									
									{/* Enhanced Image Section */}
									<div className="relative h-64 lg:h-full min-h-[500px]">
										<div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center">
											{/* Animated background elements */}
											<div className="absolute inset-0 overflow-hidden">
												<div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white/20 animate-pulse"></div>
												<div className="absolute top-3/4 right-1/4 w-12 h-12 rounded-full bg-white/15 animate-pulse delay-1000"></div>
												<div className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full bg-white/10 animate-pulse delay-2000"></div>
											</div>
											
											<div className="text-center text-white p-12 relative z-10">
												<div className="mb-8 relative">
													<div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
													<svg className="w-32 h-32 mx-auto relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
													</svg>
												</div>
												<h3 className="text-3xl font-bold mb-4">Nghiên Cứu & Sáng Tạo</h3>
												<p className="text-blue-100 text-lg">Khám phá tiềm năng không giới hạn</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Enhanced Features Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
								{/* Feature 1 */}
								<div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white">
									<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
									</div>
									<h3 className="text-2xl font-bold text-gray-800 mb-4">Quản Lý Dự Án</h3>
									<p className="text-gray-600 leading-relaxed text-lg">
										Tổ chức và theo dõi các dự án nghiên cứu một cách hiệu quả với các công cụ quản lý tiên tiến.
									</p>
								</div>

								{/* Feature 2 */}
								<div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white">
									<div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
									</div>
									<h3 className="text-2xl font-bold text-gray-800 mb-4">Hợp Tác Nhóm</h3>
									<p className="text-gray-600 leading-relaxed text-lg">
										Kết nối và làm việc cùng các thành viên trong nhóm nghiên cứu một cách dễ dàng và hiệu quả.
									</p>
								</div>

								{/* Feature 3 */}
								<div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white">
									<div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
										</svg>
									</div>
									<h3 className="text-2xl font-bold text-gray-800 mb-4">Báo Cáo & Thống Kê</h3>
									<p className="text-gray-600 leading-relaxed text-lg">
										Theo dõi tiến độ và phân tích dữ liệu nghiên cứu với các báo cáo chi tiết và trực quan.
									</p>
								</div>
							</div>

							{/* Enhanced Statistics Section */}
							<div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl text-white p-12 mb-12 shadow-2xl relative overflow-hidden">
								{/* Background decoration */}
								<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
								<div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-32 translate-x-32"></div>
								<div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-24 -translate-x-24"></div>
								
								<div className="relative z-10">
									<div className="text-center mb-12">
										<h2 className="text-4xl font-bold mb-4">Thống Kê Hệ Thống</h2>
										<p className="text-blue-100 text-xl">Những con số ấn tượng về hoạt động nghiên cứu</p>
									</div>
									
									<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
										<div className="text-center group">
											<div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">150+</div>
											<div className="text-blue-100 text-lg">Dự án nghiên cứu</div>
										</div>
										<div className="text-center group">
											<div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
											<div className="text-blue-100 text-lg">Thành viên tham gia</div>
										</div>
										<div className="text-center group">
											<div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">50+</div>
											<div className="text-blue-100 text-lg">Giảng viên hướng dẫn</div>
										</div>
										<div className="text-center group">
											<div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">98%</div>
											<div className="text-blue-100 text-lg">Tỷ lệ hoàn thành</div>
										</div>
									</div>
								</div>
							</div>

							{/* Enhanced Call to Action */}
							<div className="text-center">
								<div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-12">
									<h2 className="text-3xl font-bold text-gray-800 mb-6">
										Sẵn sàng bắt đầu nghiên cứu?
									</h2>
									<p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
										Tham gia cùng chúng tôi để khám phá những cơ hội nghiên cứu tuyệt vời 
										và phát triển các dự án khoa học có ý nghĩa.
									</p>
									<div className="flex flex-col sm:flex-row gap-6 justify-center">
										<button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg">
											Khám Phá Dự Án
										</button>
										<button className="px-10 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg">
											Tìm Hiểu Thêm
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default nhanvien;