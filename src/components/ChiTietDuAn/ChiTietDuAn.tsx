"use client";

import React, { useState, useEffect } from "react";
import { taskService } from "../../services/Tasks";

// ================ INTERFACES ================

interface AttachmentItemProps {
  name: string;
  iconSrc: string;
}

interface Attachment {
  name: string;
  iconSrc: string;
}

interface AttachmentListProps {
  attachments?: Attachment[];
}

interface ProjectInfoProps {
  name?: string;
  phone?: string;
  email?: string;
  onNameChange?: (value: string) => void;
  onPhoneChange?: (value: string) => void;
  onEmailChange?: (value: string) => void;
}

interface NavigationItem {
  icon: string;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  navigationItems?: NavigationItem[];
  logoUrl?: string;
}

type TaskStatus = "problem" | "working" | "done" | "submitted";

interface TaskItemProps {
  name: string;
  status: TaskStatus;
  iconSrc: string;
  onStatusChange: (status: TaskStatus) => void;
  description?: string;
  deadline?: string;
  assignedTo?: string;
}

interface Task {
  id?: number;
  name: string;
  status: TaskStatus;
  iconSrc: string;
  description?: string;
  deadline?: string;
  assignedTo?: string;
}

interface TaskListProps {
  tasks?: Task[];
  projectId?: number;
}

interface HeaderProps {
  searchPlaceholder?: string;
  iconIds?: string[];
}

// ================ ATTACHMENT ITEM COMPONENT ================

export const AttachmentItem: React.FC<AttachmentItemProps> = ({
  name,
  iconSrc,
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-center px-3.5 py-4 mt-4 w-full rounded-xl border border-solid bg-slate-50 border-slate-200 min-h-20 max-md:max-w-full">
      <img
        src={iconSrc}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
      />
      <p className="self-stretch my-auto text-slate-600">{name}</p>
    </div>
  );
};

// ================ ATTACHMENT LIST COMPONENT ================

const defaultAttachments: Attachment[] = [
  {
    name: "Tài liệu 1",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/212dc10ec18c931f640c742f4156b11b6b224b54?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
  },
  {
    name: "Tài liệu 2",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/212dc10ec18c931f640c742f4156b11b6b224b54?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
  },
];

export const AttachmentList: React.FC<AttachmentListProps> = ({
  attachments = defaultAttachments,
}) => {
  return (
    <section className="overflow-hidden z-10 self-center px-9 pt-4 pb-10 mt-0 max-w-full text-base font-semibold text-center rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-slate-600 w-[1077px] max-md:px-5">
      <div className="w-full max-md:max-w-full">
        <h2 className="text-2xl text-slate-600 max-md:max-w-full">
          Tài liệu đính kèm
        </h2>
        {attachments.map((attachment, index) => (
          <AttachmentItem
            key={index}
            name={attachment.name}
            iconSrc={attachment.iconSrc}
          />
        ))}
      </div>
    </section>
  );
};

// ================ PROJECT INFO COMPONENT ================

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  name: initialName = "",
  phone: initialPhone = "",
  email: initialEmail = "",
  onNameChange,
  onPhoneChange,
  onEmailChange,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);

  const handleNameChange = (value: string) => {
    setName(value);
    onNameChange?.(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    onPhoneChange?.(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    onEmailChange?.(value);
  };

  return (
    <section className="flex flex-col px-7 py-11 mt-6 w-full rounded-xl border border-solid border-slate-200 max-w-[1069px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:max-w-full">
      <div className="flex items-center justify-center w-full mb-4 relative">
        <h2 className="text-2xl font-semibold text-slate-600 text-center w-full">
          Thông tin người hướng dẫn
        </h2>
      </div>
      <div className="mt-1.5 w-full text-base text-left flex flex-col gap-4">
        <label className="text-slate-600 flex flex-col">
          Tên:
          <input
            type="text"
            className="mt-1 px-3 py-2 border rounded outline-none"
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            placeholder="Nhập tên"
          />
        </label>
        <label className="text-slate-600 flex flex-col">
          Số điện thoại:
          <input
            type="text"
            className="mt-1 px-3 py-2 border rounded outline-none"
            value={phone}
            onChange={e => handlePhoneChange(e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </label>
        <label className="text-slate-600 flex flex-col">
          Email:
          <input
            type="email"
            className="mt-1 px-3 py-2 border rounded outline-none"
            value={email}
            onChange={e => handleEmailChange(e.target.value)}
            placeholder="Nhập email"
          />
        </label>
      </div>
    </section>
  );
};


// ================ TASK ITEM COMPONENT ================

const statusOptions = [
  { value: "problem", label: "Vấn đề", className: "text-red-900 bg-rose-200" },
  { value: "working", label: "Đang làm", className: "text-blue-600 bg-blue-100" },
  { value: "done", label: "Xong", className: "text-teal-700 bg-sky-200" },
  { value: "submitted", label: "Đã nộp", className: "text-amber-500 bg-yellow-100" },
];

export const TaskItem: React.FC<TaskItemProps> = ({
  name,
  status,
  iconSrc,
  onStatusChange,
  description,
  deadline,
  assignedTo,
}) => {
  const currentStatus = statusOptions.find(opt => opt.value === status);

  return (
    <div className="flex flex-col px-3.5 py-2.5 mt-2.5 w-full rounded-xl border border-solid bg-slate-50 border-slate-200 min-h-20 max-md:max-w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3 items-center">
          <div className="flex justify-between items-center min-h-[60px]">
            <img
              src={iconSrc}
              alt=""
              className="object-contain self-stretch my-auto rounded-lg aspect-square w-[60px]"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-slate-600">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {deadline && (
            <div className="text-sm text-gray-500">
              <span className="font-medium">Deadline:</span> {deadline}
            </div>
          )}
          <div className="relative">
            <select
              value={status}
              onChange={e => onStatusChange(e.target.value as TaskStatus)}
              className={`appearance-none px-4 py-2 rounded-lg font-bold text-sm cursor-pointer border-2 border-transparent pr-8
                ${currentStatus?.className}
              `}
              style={{ minWidth: 110 }}
            >
              {statusOptions.map(opt => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className={opt.className}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {assignedTo && (
        <div className="mt-2 text-sm text-gray-500">
          <span className="font-medium">Assigned to:</span> {assignedTo}
        </div>
      )}
    </div>
  );
};

// ================ TASK LIST COMPONENT ================

export const TaskList: React.FC<TaskListProps> = ({
  tasks: propTasks,
  projectId
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (projectId) {
          const projectTasks = await taskService.getByProject(projectId);
          const formattedTasks = projectTasks.map(task => ({
            id: task.id,
            name: task.title,
            status: mapStatus(task.status || 'working'),
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4009dff95255aa53a2b4ee445dcfe42f484713dd?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
            description: task.description,
            deadline: new Date(task.dueDate).toLocaleDateString(),
            assignedTo: task.assignedToId?.toString()
          }));
          setTasks(formattedTasks);
        } else if (propTasks) {
          setTasks(propTasks);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Không thể tải danh sách nhiệm vụ. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, propTasks]);

  const handleStatusChange = async (index: number, newStatus: TaskStatus) => {
    try {
      const task = tasks[index];
      if (task.id) {
        await taskService.updateStatus(task.id, mapStatusToApi(newStatus));
        setTasks(prev =>
          prev.map((t, i) =>
            i === index ? { ...t, status: newStatus } : t
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại.");
    }
  };

  const mapStatus = (status: string): TaskStatus => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'done';
      case 'in_progress':
        return 'working';
      case 'submitted':
        return 'submitted';
      case 'problem':
        return 'problem';
      default:
        return 'working';
    }
  };

  const mapStatusToApi = (status: TaskStatus): string => {
    switch (status) {
      case 'done':
        return 'completed';
      case 'working':
        return 'in_progress';
      case 'submitted':
        return 'submitted';
      case 'problem':
        return 'problem';
      default:
        return 'in_progress';
    }
  };

  if (loading) {
    return <div>Đang tải danh sách nhiệm vụ...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="px-9 pt-8 pb-16 mt-7 -mb-8 w-full rounded-xl border border-solid border-slate-200 max-w-[1077px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mb-2.5 max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <h2 className="self-start text-2xl font-semibold text-center text-slate-600 max-md:max-w-full">
          Nhiệm vụ
        </h2>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            name={task.name}
            status={task.status}
            iconSrc={task.iconSrc}
            onStatusChange={newStatus => handleStatusChange(index, newStatus)}
            description={task.description}
            deadline={task.deadline}
            assignedTo={task.assignedTo}
          />
        ))}
      </div>
    </section>
  );
};

// ================ MAIN APP COMPONENT ================

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      <div className="flex-1 flex flex-col">

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <ProjectInfo />
            <AttachmentList />
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;