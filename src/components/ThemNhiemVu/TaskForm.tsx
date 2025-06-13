"use client";
import React, { useState } from "react";
import { FileUpload } from "./FileUpload";
import { DatePicker } from "./DatePicker";
import { MemberSelect } from "./MemberSelect";

// Define the structure of a new task data
export interface NewTaskData {
  name: string;
  content: string;
  deadline: string;
  assignedMember: string | null;
}

interface TaskFormProps {
  onSubmit: (taskData: NewTaskData) => void;
  members: string[];
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  members
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [taskDeadline, setTaskDeadline] = useState<string>("");

  const handleMemberSelect = (member: string) => {
    setSelectedMember(member);
    console.log("Selected member in TaskForm:", member);
    // You can do more here with the selected member, e.g., save it to state
  };

  const handleDateChange = (date: string) => {
    setTaskDeadline(date);
    console.log("Selected deadline in TaskForm:", date);
    // You can do more here with the selected date
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const newTask: NewTaskData = {
      name: taskName,
      content: taskContent,
      deadline: taskDeadline,
      assignedMember: selectedMember,
    };
    onSubmit(newTask);
  };

  return (
    <section className="flex flex-col px-7 pt-7 pb-10 mt-5 w-full rounded-xl border border-solid border-slate-200 max-w-[1077px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-xl font-bold leading-none text-gray-700">
        Chi tiết nhiệm vụ
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Tên nhiệm vụ"
          className="overflow-hidden gap-2.5 self-stretch px-4 mt-5 text-base leading-6 text-gray-400 bg-white rounded-lg border border-gray-300 border-solid min-h-[50px] w-[448px] max-md:max-w-full"
        />

        <div className="mt-5 bg-black bg-opacity-0 max-md:max-w-full">
          <label className="py-1 max-w-full text-xl text-gray-700 bg-black bg-opacity-0 w-[751px] max-md:pr-5">
            <span style={{ fontWeight: 700, color: "rgba(55,65,81,1)" }}>
              Nội dung nhiệm vụ:
            </span>
          </label>

          <textarea
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            placeholder="Ghi tối đa 10 ký tự"
            className="overflow-hidden px-3.5 pt-4 pb-12 text-base text-gray-400 bg-white rounded-md border border-gray-300 border-solid max-md:pr-5 max-md:max-w-full w-full"
            rows={4}
          />
        </div>

        <FileUpload />
        <DatePicker
          label="Thời hạn hoàn thành nhiệm vụ:"
          selectedDate={taskDeadline}
          onDateChange={handleDateChange}
        />
        <MemberSelect members={members} onMemberSelect={handleMemberSelect} />

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