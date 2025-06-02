"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/Duyệt Dự Án/Sidebar";
import Header from "@cnpm/components/Header";
import { TabSelector, Project } from "@cnpm/components/Duyệt Dự Án/TabSelector";

interface DuyetDuAnProps {
  userRole: string; // Example prop: role of the logged-in user
}

export default function DuyetDuAn({
  userRole
}: DuyetDuAnProps) {
  // You might use userRole here to conditionally render content or features
  console.log("Accessing DuyetDuAn page with role:", userRole);

  // Mock project data
  const [pendingProjects, setPendingProjects] = React.useState<Project[]>([
    {
      id: "25CN22",
      name: "Bác sĩ online",
      proposer: "Ths Nguyễn Văn Hồng",
      date: "25/05/2025",
    },
    {
      id: "25NN23",
      name: "Ngữ pháp thời Edo",
      proposer: "Ths Nguyễn Văn Minh",
      date: "26/05/2025",
    },
    {
      id: "25CN24",
      name: "Dự án 1",
      proposer: "Ths Nguyễn Văn A",
      date: "27/05/2025",
    },
  ]);

  const [approvedProjects, setApprovedProjects] = React.useState<Project[]>([
    {
      id: "25CN22",
      name: "Bác sĩ online",
      proposer: "Ths Nguyễn Văn Hồng",
      date: "25/05/2025",
    },
    {
      id: "25NN23",
      name: "Ngữ pháp thời Edo",
      proposer: "Ths Nguyễn Văn Minh",
      date: "26/05/2025",
    },
  ]);

  const [rejectedProjects, setRejectedProjects] = React.useState<Project[]>([
    {
      id: "25CN24",
      name: "Dự án 1",
      proposer: "Ths Nguyễn Văn A",
      date: "27/05/2025",
    },
  ]);

  // Handlers for project actions
  const handleApprove = (id: string) => {
    // Find the project in pending projects
    const projectToApprove = pendingProjects.find(p => p.id === id);
    if (projectToApprove) {
      // Remove from pending
      setPendingProjects(pendingProjects.filter(p => p.id !== id));
      // Add to approved
      setApprovedProjects([...approvedProjects, projectToApprove]);
      // TODO: Implement API call to update project status
      console.log("Approved project:", id);
    }
  };

  const handleReject = (id: string) => {
    // Find the project in pending projects
    const projectToReject = pendingProjects.find(p => p.id === id);
    if (projectToReject) {
      // Remove from pending
      setPendingProjects(pendingProjects.filter(p => p.id !== id));
      // Add to rejected
      setRejectedProjects([...rejectedProjects, projectToReject]);
      // TODO: Implement API call to update project status
      console.log("Rejected project:", id);
    }
  };

  const handleView = (id: string) => {
    // TODO: Implement project view logic
    console.log("Viewing project:", id);
  };

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
          <section className="flex flex-col items-center pb-10 w-full max-w-full mt-16">
            <h1 className="mt-8 text-3xl font-bold text-gray-700">
              Duyệt dự án
            </h1>
            <TabSelector
              pendingProjects={pendingProjects}
              approvedProjects={approvedProjects}
              rejectedProjects={rejectedProjects}
              onApprove={handleApprove}
              onReject={handleReject}
              onView={handleView}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
