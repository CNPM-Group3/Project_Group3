"use client";
import React, { useState } from "react";
import { FileUpload } from "./FileUpload";
import { DatePicker } from "./DatePicker";
import { MemberSelect } from "./MemberSelect";

// Define the structure of a new task data
export interface NewTaskData {
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  projectId: number;
  assignedToId: number;
  isMilestone: boolean;
  attachmentUrls: string;
}

interface TaskFormProps {
  onSubmit: (taskData: NewTaskData) => void;
  members: Array<{ id: number; name: string }>;
  projectId: number;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  members,
  projectId
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!taskTitle.trim()) {
      newErrors.title = "Tên nhiệm vụ không được để trống";
    }
    
    if (!taskDescription.trim()) {
      newErrors.description = "Nội dung nhiệm vụ không được để trống";
    }
    
    if (!dueDate) {
      newErrors.dueDate = "Vui lòng chọn thời hạn hoàn thành";
    }
    
    if (!selectedMember) {
      newErrors.member = "Vui lòng chọn người thực hiện";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMemberSelect = (memberId: number) => {
    setSelectedMember(memberId);
    if (errors.member) {
      setErrors(prev => ({ ...prev, member: "" }));
    }
  };

  const handleDateChange = (date: string) => {
    setDueDate(date);
    if (errors.dueDate) {
      setErrors(prev => ({ ...prev, dueDate: "" }));
    }
  };

  const handleFileUpload = (files: File[]) => {
    setAttachments(files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newTask: NewTaskData = {
      title: taskTitle,
      description: taskDescription,
      startDate: new Date(startDate).toISOString(),
      dueDate: new Date(dueDate).toISOString(),
      projectId,
      assignedToId: selectedMember || 0,
      isMilestone: false,
      attachmentUrls: attachments.map(file => URL.createObjectURL(file)).join(",")
    };
    
    onSubmit(newTask);
  };

  return (
    <section className="flex flex-col px-7 pt-7 pb-10 mt-5 w-full rounded-xl border border-solid border-slate-200 max-w-[1077px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-xl font-bold leading-none text-gray-700">
        Chi tiết nhiệm vụ
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên nhiệm vụ</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: "" }));
              }
            }}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div className="mt-5 bg-black bg-opacity-0 max-md:max-w-full">
          <label className="py-1 max-w-full text-xl text-gray-700 bg-black bg-opacity-0 w-[751px] max-md:pr-5">
            <span style={{ fontWeight: 700, color: "rgba(55,65,81,1)" }}>
              Nội dung nhiệm vụ:
            </span>
          </label>

          <textarea
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
              if (errors.description) {
                setErrors(prev => ({ ...prev, description: "" }));
              }
            }}
            placeholder="Nhập nội dung nhiệm vụ"
            className={`overflow-hidden px-3.5 pt-4 pb-12 text-base text-gray-400 bg-white rounded-md border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } border-solid max-md:pr-5 max-md:max-w-full w-full`}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Người thực hiện</label>
          <MemberSelect
            members={members}
            selectedMember={selectedMember}
            onSelect={handleMemberSelect}
            error={errors.member}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thời hạn hoàn thành</label>
          <DatePicker
            selectedDate={dueDate}
            onChange={handleDateChange}
            error={errors.dueDate}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tệp đính kèm</label>
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        <button
          type="submit"
          className="self-center mx-auto px-16 py-3.5 mt-10 max-w-full text-2xl font-bold text-center text-white whitespace-nowrap bg-teal-500 rounded-lg border-0 border border-solid w-[300px] max-md:px-5 hover:bg-teal-600 transition-colors"
        >
          Tạo
        </button>
      </form>
    </section>
  );
};