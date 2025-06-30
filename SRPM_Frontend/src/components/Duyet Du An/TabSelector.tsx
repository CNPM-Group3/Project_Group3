import React, { useState, useEffect } from "react";
import { ProjectList, Project } from "./ProjectList";
import { getProjectsByStatus, Project as ApiProject } from "../../services/projectService";
import { getUserById, User } from "../../services/userService";

type TabType = "pending" | "approved" | "rejected";

interface TabSelectorProps {
  onApprove: (project: Project) => void;
  onReject: (project: Project) => void;
  onView: (project: Project) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ onApprove, onReject, onView }) => {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        let statusToFetch: string;
        switch (activeTab) {
          case "pending":
            statusToFetch = "Pending";
            break;
          case "approved":
            statusToFetch = "Approved";
            break;
          case "rejected":
            statusToFetch = "Rejected";
            break;
          default:
            statusToFetch = "Pending";
        }
        const fetchedProjects: ApiProject[] = await getProjectsByStatus(statusToFetch);

        // Fetch proposer names for each project and transform ApiProject to Project
        const projectsWithProposerNames: Project[] = await Promise.all(
          fetchedProjects.map(async (apiProject) => {
            let proposerName = "Unknown Proposer";
            if (apiProject.ownerId) {
              try {
                const proposer: User = await getUserById(apiProject.ownerId);
                proposerName = proposer.name; // Assuming User has a 'name' property
              } catch (userError) {
                console.error(`Error fetching user for project ${apiProject.id}:`, userError);
                proposerName = "Unknown Proposer";
              }
            }
            return {
              id: apiProject.id,
              title: apiProject.title, // Use title as defined in ProjectList
              proposerName,
              description: apiProject.description,
              objectives: apiProject.objectives,
              expectedOutcomes: apiProject.expectedOutcomes,
              startDate: apiProject.startDate,
              endDate: apiProject.endDate,
              researchTopicId: apiProject.researchTopicId,
              ownerId: apiProject.ownerId,
              status: apiProject.status,
              createdAt: apiProject.createdAt, // Use createdAt as defined in ProjectList
              updatedAt: apiProject.updatedAt
            };
          })
        );
        setProjects(projectsWithProposerNames);
      } catch (err: any) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeTab]);

  // Filter projects based on search keyword
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    project.id.toString().includes(searchKeyword.toLowerCase()) ||
    (project.proposerName && project.proposerName.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleApprove = (project: Project) => {
    onApprove(project);
  };

  const handleReject = (project: Project) => {
    onReject(project);
  };

  const handleView = (project: Project) => {
    onView(project);
  };

  return (
    <div className="w-full max-w-[992px] mx-auto">
      <div className="flex flex-wrap gap-1 items-center justify-center px-1 py-1 mt-10 text-sm font-bold text-teal-500 bg-white rounded-lg max-md:max-w-full">
        <button
          onClick={() => handleTabClick("pending")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "pending"
              ? "text-white bg-teal-500"
              : "bg-teal-100"
          }`}
        >
          Chờ duyệt
        </button>
        <button
          onClick={() => handleTabClick("approved")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "approved"
              ? "text-white bg-teal-500"
              : "bg-teal-100"
          }`}
        >
          Đã duyệt
        </button>
        <button
          onClick={() => handleTabClick("rejected")}
          className={`self-stretch px-24 py-1.5 my-auto rounded-lg min-h-[27px] min-w-60 w-[271px] max-md:px-5 ${
            activeTab === "rejected"
              ? "text-white bg-teal-500"
              : "bg-teal-100"
          }`}
        >
          Từ chối
        </button>
      </div>
      <div className="flex flex-row items-center justify-between mt-4 w-full">
        <div className="flex items-center w-[250px] bg-white border border-gray-300 rounded-full px-3 py-1.5 shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base text-gray-700 placeholder-gray-400"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-700">
          Danh sách dự án
        </h2>
      </div>
      {loading && <p className="text-center text-gray-600 mt-8">Loading projects...</p>}
      {error && <p className="text-center text-red-500 mt-8">{error}</p>}
      {!loading && !error && (
      <ProjectList
        projects={filteredProjects}
        actionType={
          activeTab === "pending" ? "both" :
          activeTab === "approved" ? "reject" :
          "approve"
        }
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
      />
      )}
    </div>
  );
};

export { TabSelector };