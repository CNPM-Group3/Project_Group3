import React, { useState } from "react";
import { TaskItem } from "./TaskItem";

type TaskStatus = "problem" | "working" | "done" | "submitted";

interface Task {
  name: string;
  status: TaskStatus;
  iconSrc: string;
}

interface TaskListProps {
  tasks?: Task[];
}

const initialTasks: Task[] = [
  {
    name: "Nhiệm vụ 1",
    status: "problem",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4009dff95255aa53a2b4ee445dcfe42f484713dd?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
  },
  {
    name: "Nhiệm vụ 2",
    status: "working",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4009dff95255aa53a2b4ee445dcfe42f484713dd?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
  },
  {
    name: "Nhiệm vụ 3",
    status: "done",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4009dff95255aa53a2b4ee445dcfe42f484713dd?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
  },
  {
    name: "Nhiệm vụ 4",
    status: "submitted",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4009dff95255aa53a2b4ee445dcfe42f484713dd?placeholderIfAbsent=true&apiKey=2e3ce05d0ae44b27a762aa356ea6be1a",
  },
];

export const TaskList: React.FC<TaskListProps> = ({
  tasks: propTasks,
}) => {
  const [tasks, setTasks] = useState<Task[]>(propTasks || initialTasks);

  const handleStatusChange = (index: number, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map((task, i) =>
        i === index ? { ...task, status: newStatus } : task
      )
    );
  };

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
          />
        ))}
      </div>
    </section>
  );
};
