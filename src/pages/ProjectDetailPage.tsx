"use client";
import React from "react";
import Sidebar from "@cnpm/components/ChiTietDuAn/Sidebar";
import Header from "@cnpm/components/Header";
import { ProjectInfo } from "../components/ChiTietDuAn/ProjectInfo";
import { TaskList } from "../components/ChiTietDuAn/TaskList";
import { AttachmentList } from "../components/ChiTietDuAn/AttachmentList";

interface ProjectDetailPageProps {
  projectId: string; // Example prop: ID of the project to display
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
}) => {
  // You would typically use projectId here to fetch project data
  console.log("Displaying project with ID:", projectId);

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed w-full z-10">
            <Header />
          </div>
          {/* Content */}
          <section className="flex flex-col items-center pb-16 w-full max-w-full mt-16">
            <h1 className="mt-8 text-3xl font-bold text-gray-700 mb-8">
              Tên Dự án {projectId}
            </h1>
            <div className="w-full max-w-[800px]">
              {/* You might pass projectId down to these components if they depend on it */}
              <ProjectInfo />
              <TaskList />
              <div className="mt-10">
                <AttachmentList />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;
