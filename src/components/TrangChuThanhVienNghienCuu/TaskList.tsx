import React, { useState, useEffect } from "react";
import { taskService } from "../../services/Tasks";

interface TaskProps {
  id?: number;
  title: string;
  status: string;
  deadline?: string;
  description?: string;
  projectName?: string;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        let fetchedTasks;
        
        // Get tasks based on status filter
        if (statusFilter !== "all") {
          fetchedTasks = await taskService.getByStatus(statusFilter);
        } else {
          // Get all tasks assigned to current user
          const userId = 1; // Replace with actual user ID from auth context
          fetchedTasks = await taskService.getByAssignedUser(userId);
        }

        // Format tasks
        const formattedTasks = fetchedTasks.map(task => ({
          id: task.id,
          title: task.title,
          status: mapStatus(task.status || 'in_progress'),
          deadline: new Date(task.dueDate).toLocaleDateString(),
          description: task.description,
          projectName: `Project ${task.projectId}` // You might want to fetch actual project names
        }));

        setTasks(formattedTasks);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Không thể tải danh sách nhiệm vụ. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [statusFilter]);

  const mapStatus = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Xong';
      case 'in_progress':
        return 'Đang làm';
      case 'submitted':
        return 'Đã nộp';
      case 'problem':
        return 'Vấn đề';
      default:
        return 'Đang làm';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Xong":
        return "bg-green-100 text-green-800";
      case "Vấn đề":
        return "bg-red-100 text-red-800";
      case "Đang làm":
        return "bg-blue-100 text-blue-800";
      case "Đã nộp":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div>Đang tải danh sách nhiệm vụ...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="flex flex-col gap-5 px-8 pt-6 pb-6 bg-white rounded-xl border border-solid shadow-sm border-slate-200 w-[846px] max-md:w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">Nhiệm vụ</h2>
        <div className="flex gap-2">
          <select 
            className="px-3 py-1 border rounded-lg text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="in_progress">Đang thực hiện</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="submitted">Đã nộp</option>
            <option value="problem">Vấn đề</option>
          </select>
          <select 
            className="px-3 py-1 border rounded-lg text-sm"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">Tất cả dự án</option>
            <option value="projectA">Dự án A</option>
            <option value="projectB">Dự án B</option>
            <option value="projectC">Dự án C</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col gap-2.5">
        {tasks.map((task, index) => (
          <article key={index} className="flex flex-col p-4 rounded-xl border border-solid bg-slate-50 border-slate-200">
            <div className="flex justify-between items-center">
              <div className="flex gap-7 items-center">
                <div className="flex relative justify-center items-center p-1 h-[46px] w-[46px]">
                  <div className="absolute bg-teal-500 rounded-lg h-[46px] w-[46px]" />
                  <div dangerouslySetInnerHTML={{
                    __html: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px; position: relative; z-index: 1">
                      <path d="M20 11.6667C20 9.89856 19.2976 8.20286 18.0474 6.95262C16.7971 5.70238 15.1014 5 13.3333 5H3.33331V30H15C16.3261 30 17.5978 30.5268 18.5355 31.4645C19.4732 32.4021 20 33.6739 20 35M20 11.6667V35M20 11.6667C20 9.89856 20.7024 8.20286 21.9526 6.95262C23.2028 5.70238 24.8985 5 26.6666 5H36.6666V30H25C23.6739 30 22.4021 30.5268 21.4644 31.4645C20.5268 32.4021 20 33.6739 20 35" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>`
                  }} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold text-slate-600">{task.title}</h3>
                  {task.projectName && (
                    <span className="text-sm text-gray-500">{task.projectName}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                {task.deadline && (
                  <span className="text-sm text-gray-500">
                    Deadline: {task.deadline}
                  </span>
                )}
                <span className={`px-4 py-2 text-sm font-bold rounded-lg ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>
            {task.description && (
              <p className="mt-2 text-sm text-gray-600">{task.description}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
