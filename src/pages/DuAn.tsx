"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { ProjectCard } from "@cnpm/components/Du An/ProjectCard";
import { SearchInput } from "@cnpm/components/Du An/SearchInput";
import { useNavigate } from "react-router-dom";
import { getProjectsByOwner, getProjectsByMember } from "../services/projectService"; // Assuming the service is in this path
import { authService, UserProfile } from "../services/authService"; // Assuming the service is in this path

// Define Project interface to match API response
interface Project {
  id: number;
  title: string;
  description: string;
  objectives: string;
  expectedOutcomes: string;
  startDate: string;
  endDate: string;
  researchTopicId: number;
  ownerId?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function DuAn() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Get user profile and determine role
        const profile = authService.getCurrentProfile();
        if (!profile) {
          // If no profile in memory, try to fetch it
          await authService.fetchAndStoreUserProfile();
          const fetchedProfile = authService.getCurrentProfile();
          setUserProfile(fetchedProfile);
        } else {
          setUserProfile(profile);
        }

        // Determine user role - you may need to adjust this logic based on your role system
        const role = profile?.roles?.[0] || "Researcher"; // Default to researcher-member
        setUserRole(role);
        
        await fetchUserProjects(profile);
      } catch (err) {
        console.error("Error initializing component:", err);
        setError("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, []);

  const fetchUserProjects = async (profile: UserProfile | null) => {
    if (!profile?.id) {
      setError("Không tìm thấy thông tin người dùng");
      return;
    }

    try {
      setLoading(true);
      let userProjects: Project[] = [];

      // Check if user is Principal Investigator or Researcher Member
      const isPrincipalInvestigator = profile.roles?.includes("PrincipalInvestigator") || 
                                     profile.roles?.includes("nghien-cuu-chinh");

      if (isPrincipalInvestigator) {
        // Get projects owned by this user
        userProjects = await getProjectsByOwner(profile.id);
      } else {
        // Get projects where this user is a member
        userProjects = await getProjectsByMember(profile.id);
      }

      setProjects(userProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Không thể tải danh sách dự án");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (project: Project) => {
    const isPrincipalInvestigator = userProfile?.roles?.includes("PrincipalInvestigator") || 
                                   userProfile?.roles?.includes("nghien-cuu-chinh");

    if (!isPrincipalInvestigator) {
      navigate("/chitietduan", {
        state: {
          id: project.id,
          title: project.title,
          description: project.description,
          objectives: project.objectives,
          expectedOutcomes: project.expectedOutcomes,
          startDate: project.startDate,
          endDate: project.endDate,
          status: project.status,
          ownerId: project.ownerId,
          researchTopicId: project.researchTopicId,
          project: project
        },
      });
    } else {
      alert("Chỉ nhà nghiên cứu chính mới có quyền xem chi tiết dự án.");
    }
  };

  const handleCreateProject = () => {
    const isPrincipalInvestigator = userProfile?.roles?.includes("principal-investigator") || 
                                   userProfile?.roles?.includes("nghien-cuu-chinh");

    if (isPrincipalInvestigator) {
      navigate("/taoduannghiencuuchinh");
    } else {
      alert("Chỉ nhà nghiên cứu chính mới có quyền tạo dự án.");
    }
  };

  if (loading) {
    return (
      <main className="bg-slate-50 min-h-screen w-full">
        <div className="flex flex-row min-h-screen">
          <div className="w-[18%] border-r border-slate-200 bg-gray">
            <Sidebar />
          </div>
          <div className="w-[110%] flex flex-col">
            <Header />
            <section className="flex flex-col items-center pb-60 w-full max-w-full">
              <h1 className="mt-8 text-3xl font-bold text-gray-700">
                Dự án của tôi
              </h1>
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                <p className="mt-2 text-gray-600">Đang tải dự án...</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-slate-50 min-h-screen w-full">
        <div className="flex flex-row min-h-screen">
          <div className="w-[18%] border-r border-slate-200 bg-gray">
            <Sidebar />
          </div>
          <div className="w-[110%] flex flex-col">
            <Header />
            <section className="flex flex-col items-center pb-60 w-full max-w-full">
              <h1 className="mt-8 text-3xl font-bold text-gray-700">
                Dự án của tôi
              </h1>
              <div className="mt-8 text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p>{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-[18%] border-r border-slate-200 bg-gray">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="w-[110%] flex flex-col">
          {/* Header */}
          <Header />
          {/* Content */}
          <section className="flex flex-col items-center pb-60 w-full max-w-full">
            <h1 className="mt-8 text-3xl font-bold text-gray-700">
              Dự án của tôi
            </h1>
            <div className="flex flex-wrap gap-5 justify-between mt-7 w-full max-w-[1000px]">
              <div className="self-start mt-2">
                <SearchInput />
              </div>
              {/* Only show create button for Principal Investigator */}
              {(userProfile?.roles?.includes("principal-investigator") || 
                userProfile?.roles?.includes("nghien-cuu-chinh")) && (
                <button
                  type="button"
                  onClick={handleCreateProject}
                  className="flex gap-1.5 px-6 py-4 text-base font-bold text-white bg-teal-500 rounded-lg
                            cursor-pointer transition duration-200 ease-in-out
                            hover:bg-teal-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bfd0f5c4eb9b96885ca236846c267d6df16db19?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
                    className="object-contain shrink-0 w-5 aspect-square"
                    alt="Create project icon"
                  />
                  <span>Tạo dự án</span>
                </button>
              )}
            </div>
            <div className="mt-3.5 w-full max-w-[992px]">
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Chưa có dự án nào
                  </h3>
                  <p className="text-gray-500">
                    {userProfile?.roles?.includes("principal-investigator") || 
                     userProfile?.roles?.includes("nghien-cuu-chinh")
                      ? "Hãy tạo dự án đầu tiên của bạn"
                      : "Bạn chưa tham gia vào dự án nào"}
                  </p>
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="cursor-pointer mb-4"
                  >
                    <ProjectCard
                      title={project.title}
                      group={`ID: ${project.id}`} // You may want to replace this with actual group data
                      supervisor={`Owner ID: ${project.ownerId}`} // You may want to fetch actual owner name
                      // description={project.description}
                      // status={project.status}
                      // startDate={project.startDate}
                      // endDate={project.endDate}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}