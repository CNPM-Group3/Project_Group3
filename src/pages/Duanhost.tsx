"use client";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import Sidebar from "@cnpm/components/Duyet Du An/Sidebar";
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
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtered projects based on search term
  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) {
      return projects;
    }
    
    const searchLower = searchTerm.toLowerCase().trim();
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.objectives.toLowerCase().includes(searchLower) ||
      project.expectedOutcomes.toLowerCase().includes(searchLower) ||
      project.status?.toLowerCase().includes(searchLower) ||
      project.id.toString().includes(searchLower)
    );
  }, [projects, searchTerm]);

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
        // const role = profile?.roles?.[0] || "Researcher"; // Default to researcher-member
        // setUserRole(role);
        
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
      const isPrincipalInvestigator = profile.roles?.includes("HostInstitution") || 
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
    const isPrincipalInvestigator = userProfile?.roles?.includes("HostInstitution") || 
                                   userProfile?.roles?.includes("chu-tri");

    if (!isPrincipalInvestigator) {
      navigate("/chitietduanhost", {
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
    const isPrincipalInvestigator = userProfile?.roles?.includes("HostInstitution") || 
                                   userProfile?.roles?.includes("reseacher-member");

    if (isPrincipalInvestigator) {
      navigate("/taoduannghiencuuchinh");
    } else {
      alert("Chỉ nhà nghiên cứu chính mới có quyền tạo dự án.");
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <main className="bg-white min-h-screen w-full border border-gray-200">
        <div className="flex min-h-screen w-screen">
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
            <Sidebar />
          </aside>
          {/* Main content */}
          <div className="flex-1 flex flex-col ml-64">
            {/* Header */}
            <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
              <Header />
            </div>
            <section className="flex flex-col items-center pb-60 w-full max-w-screen-lg mx-auto mt-16 pt-16">
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
      <main className="bg-white min-h-screen w-full border border-gray-200">
        <div className="flex min-h-screen w-screen">
          {/* Sidebar */}
          <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
            <Sidebar />
          </aside>
          {/* Main content */}
          <div className="flex-1 flex flex-col ml-64">
            {/* Header */}
            <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
              <Header />
            </div>
            <section className="flex flex-col items-center pb-60 w-full max-w-screen-lg mx-auto mt-16 pt-16">
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
    <main className="bg-white min-h-screen w-full border border-gray-200">
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
          <Sidebar />
        </aside>
        {/* Main content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-300">
            <Header />
          </div>
          <section className="flex flex-col items-center pb-60 w-full max-w-screen-lg mx-auto mt-16 pt-16">
            <h1 className="mt-8 text-3xl font-bold text-gray-700">
              Dự án của tôi
            </h1>
            <div className="flex flex-wrap gap-5 justify-between mt-7 w-full max-w-[1000px]">
              <div className="self-start mt-2">
                <SearchInput 
                  onSearch={handleSearch} 
                  placeholder="Tìm kiếm"
                  value={searchTerm}
                />
              </div>
              {/* Only show create button for Principal Investigator */}
              {/* {(userProfile?.roles?.includes("principal-investigator") || 
                userProfile?.roles?.includes("nghien-cuu-chinh")) && ( */}
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
              
            </div>
            
            {/* Search results info */}
            {searchTerm.trim() && (
              <div className="mt-4 w-full max-w-[992px] flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-medium">
                    Tìm thấy {filteredProjects.length} dự án cho "{searchTerm}"
                  </span>
                </div>
                <button
                  onClick={handleClearSearch}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            <div className="mt-3.5 w-full max-w-[992px]">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">
                    {searchTerm.trim() ? "🔍" : "📋"}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {searchTerm.trim() 
                      ? `Không tìm thấy dự án nào với từ khóa "${searchTerm}"`
                      : "Chưa có dự án nào"
                    }
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm.trim() 
                      ? "Hãy thử tìm kiếm với từ khóa khác"
                      : "Hãy tạo dự án đầu tiên của bạn"
                    }
                  </p>
                  {searchTerm.trim() && (
                    <button
                      onClick={handleClearSearch}
                      className="mt-3 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
                    >
                      Xem tất cả dự án
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Search results count */}
                  {projects.length > 0 && (
                    <div className="mb-4 text-sm text-gray-600">
                      Hiển thị {filteredProjects.length} / {projects.length} dự án
                    </div>
                  )}
                  
                  {filteredProjects.map((project) => (
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
                  ))}
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}