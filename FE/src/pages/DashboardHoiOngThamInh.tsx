"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Sidebar from "../components/HoiDongThamDinh/Sidebar";
import DashboardHeader from "../components/Header";
import { ProjectEvaluation, PhaseProgress } from "../components/HoiDongThamDinh/StatusIndicator";
import { TabSelector } from "../components/Duyet Du An/TabSelector";
import { Project } from "@cnpm/components/HoiDongThamDinh/danhgiasuan";
import { getProjects, updateProject, updateProjectStatus } from "../services/projectService";


const DashboardHoiDongThamInh: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [generalFeedback, setGeneralFeedback] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách dự án:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const handleApprove = async (project: Project) => {
    try {
      await updateProjectStatus(project.id, "Approved");
      window.alert("Duyệt dự án thành công!");
      // Reload lại danh sách dự án
      const data = await getProjects();
      setProjects(data);
      setSelectedProject(null);
    } catch (error) {
      window.alert("Có lỗi khi duyệt dự án!");
      console.error(error);
    }
  };

  const handleReject = async (project: Project) => {
    try {
      await updateProjectStatus(project.id, "Rejected");
      window.alert("Từ chối dự án thành công!");
      // Reload lại danh sách dự án
      const data = await getProjects();
      setProjects(data);
      setSelectedProject(null);
    } catch (error) {
      window.alert("Có lỗi khi từ chối dự án!");
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen w-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <Sidebar />
        </aside>

        {/* Main content */}
        <section className="flex-1 flex flex-col">
          <DashboardHeader />

          <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
            {!selectedProject ? (
              // Display project list if no project is selected
              <>
                <h1 className="mt-8 text-3xl font-bold text-gray-700">Dự án cần thẩm định</h1>
                <TabSelector 
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onView={handleViewProject}
                />
              </>
            ) : (
              // Display project evaluation if a project is selected
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <button 
                  onClick={handleBackToList}
                  className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  &larr; Quay lại danh sách dự án
                </button>
                {/* Tiêu đề chính */}
                <h2 className="text-lg font-semibold mb-6 text-gray-800">
                  Đánh giá dự án: {selectedProject.title}
                </h2>

                {/* ProjectEvaluation block */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
                  <ProjectEvaluation project={selectedProject} />
                </div>

                {/* PhaseProgress + Comment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Giai đoạn tiến độ */}
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 className="text-base font-semibold mb-3 text-gray-700">
                      Đánh giá mốc tiến độ
                    </h3>
                    <PhaseProgress project={selectedProject} />
                  </div>

                  {/* Phản hồi */}
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold mb-3 text-gray-700">
                        Phản hồi tổng quan
                      </h3>
                      <textarea
                        className="w-full h-[200px] p-4 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Nhập phản hồi tổng quan..."
                        value={generalFeedback}
                        onChange={e => setGeneralFeedback(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end mt-4">
                      <button 
                        className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg shadow"
                        onClick={async () => {
                          if (!generalFeedback.trim()) {
                            window.alert("Vui lòng nhập phản hồi tổng quan!");
                            return;
                          }
                          try {
                            // TODO: Gọi API gửi phản hồi tổng quan ở đây
                            // await evaluationService.createGeneralFeedback({ projectId: selectedProject.id, feedback: generalFeedback });
                            console.log("Gửi phản hồi tổng quan:", { projectId: selectedProject?.id, feedback: generalFeedback });
                            window.alert("Gửi phản hồi tổng quan thành công!");
                            setGeneralFeedback("");
                          } catch (error) {
                            window.alert("Có lỗi khi gửi phản hồi tổng quan!");
                            console.error(error);
                          }
                        }}
                      >
                        Gửi đánh giá
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardHoiDongThamInh;