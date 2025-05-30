"use client";
import React from "react";
import Sidebar from "@cnpm/components/ChiTietDuAn/Sidebar";
import Header from "@cnpm/components/Header";
import { ProjectInfo } from "../components/ChiTietDuAn/ProjectInfo";
import { TaskList } from "../components/ChiTietDuAn/TaskList";
import { AttachmentList } from "../components/ChiTietDuAn/AttachmentList";

export const ProjectDetailPage: React.FC = () => {
  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-[18%] border-r border-slate-200 bg-gray">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          {/* Content */}
          <section className="flex flex-col items-center pb-16 w-full max-w-full">
            <h1 className="mt-8 text-3xl font-bold text-gray-700 mb-8">
              Tên Dự án
            </h1>
            <div className="w-full max-w-[800px]">
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
