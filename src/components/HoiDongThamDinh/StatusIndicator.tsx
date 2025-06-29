"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@cnpm/components/Duyet Du An/ProjectList";
import { evaluationService } from "../../services/evaluationsService";

// Types
type PhaseStatusType = "completed" | "in-progress" | "not-started";
type EvaluationOption = "good" | "average" | "poor";

interface PhaseStatus {
  phase: string;
  status: PhaseStatusType;
}

interface Criterion {
  id: string;
  label: string;
}

interface StatusIndicatorProps {
  status: "good" | "average" | "poor";
  label: string;
  showIcon?: boolean;
  className?: string;
}

interface ProjectEvaluationProps {
  project: Project;
}

interface PhaseProgressProps {
  project: Project;
}

// Constants
const statusOptions: Record<PhaseStatusType, { text: string; bg: string; icon: string }> = {
  completed: {
    text: "Hoàn Thành",
    bg: "bg-emerald-300",
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/8b98aeff18797f45569e8536ad1c37ed402f4276?placeholderIfAbsent=true",
  },
  "in-progress": {
    text: "Đang thực hiện",
    bg: "bg-yellow-300",
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/dbd1e3dfcb2a72321254ca452254c2d280ffc3c3?placeholderIfAbsent=true",
  },
  "not-started": {
    text: "Chưa bắt đầu",
    bg: "bg-rose-300",
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/467d769626ecc4b4470459ea68ac3ebf8a893038?placeholderIfAbsent=true",
  },
};

const CRITERIA: Criterion[] = [
  { id: "planning", label: "Lập kế hoạch" },
  { id: "execution", label: "Thực hiện" },
  { id: "effectiveness", label: "Hiệu quả" },
];

const statusColors = {
  good: "bg-emerald-200 text-black",
  average: "bg-yellow-200 text-black",
  poor: "bg-rose-300 text-black",
  base: "bg-gray-100 text-gray-600 hover:bg-gray-200",
};

// StatusIndicator Component
export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showIcon = false,
  className = "",
}) => {
  // Màu nền rõ hơn để hiển thị dễ nhìn hơn
  const getStatusStyles = () => {
    switch (status) {
      case "good":
        return "bg-emerald-300";
      case "average":
        return "bg-yellow-300";
      case "poor":
        return "bg-rose-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <div
        className={`h-[23px] w-[23px] rounded-full ${getStatusStyles()}`}
      />
      <span className="text-sm text-gray-700">{label}</span>
      {showIcon && (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/40274b722d9dbb54ac71371c7a7ba0ebfb894b86?placeholderIfAbsent=true"
          className="w-5 h-5 object-contain"
          alt="status icon"
        />
      )}
    </div>
  );
};

// PhaseProgress Component
export const PhaseProgress: React.FC<PhaseProgressProps> = ({ project }) => {
  const [phases, setPhases] = useState<PhaseStatus[]>([
    { phase: "Giai đoạn 1", status: "completed" },
    { phase: "Giai đoạn 2", status: "in-progress" },
    { phase: "Giai đoạn 3", status: "not-started" },
  ]);

  // In a real application, you would fetch phase data based on project.id
  useEffect(() => {
    if (project) {
      console.log(`Fetching phase progress for project: ${project.title}`);
      // Example: fetchPhaseProgress(project.id).then(data => setPhases(data));
      // For now, keep dummy data, but associate with project if needed
      setPhases([
        { phase: "Giai đoạn 1", status: "completed" },
        { phase: "Giai đoạn 2", status: "in-progress" },
        { phase: "Giai đoạn 3", status: "not-started" },
      ]);
    }
  }, [project]);

  const handleChange = (index: number, newStatus: PhaseStatusType) => {
    const newPhases = [...phases];
    newPhases[index].status = newStatus;
    setPhases(newPhases);
  };

  return (
    <div className="px-6 py-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const { icon, text, bg } = statusOptions[phase.status];
          return (
            <div key={index} className="flex items-center justify-between gap-4">
              {/* Giai đoạn */}
              <span className="text-base font-medium text-gray-800 whitespace-nowrap w-[120px]">
                {phase.phase}
              </span>

              {/* Chọn trạng thái */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${bg} min-w-[230px]`}>
                <img src={icon} alt={text} className="w-5 h-5 object-contain" />
                <select
                  value={phase.status}
                  onChange={(e) => handleChange(index, e.target.value as PhaseStatusType)}
                  className="bg-transparent text-sm font-medium text-black outline-none flex-1"
                >
                  {Object.entries(statusOptions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ProjectEvaluation Component
export const ProjectEvaluation: React.FC<ProjectEvaluationProps> = ({ project }) => {
  const [selections, setSelections] = useState<Record<string, EvaluationOption | null>>({
    planning: null,
    execution: null,
    effectiveness: null,
  });
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project) {
      const fetchEvaluations = async () => {
        try {
          const data = await evaluationService.getEvaluationsByProject(project.id);
          setEvaluations(data);

          // Đồng bộ selections với dữ liệu từ API
          const newSelections: Record<string, EvaluationOption | null> = {
            planning: null,
            execution: null,
            effectiveness: null,
          };
          data.forEach(ev => {
            if (ev.content && ["planning", "execution", "effectiveness"].includes(ev.content)) {
              newSelections[ev.content] = ev.type as EvaluationOption;
            }
          });
          setSelections(newSelections);
        } catch (error) {
          console.error("Lỗi khi lấy đánh giá theo projectId:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchEvaluations();
    }
  }, [project]);

  const handleSelect = async (criterionId: string, value: EvaluationOption) => {
    setSelections((prev) => ({ ...prev, [criterionId]: value }));

    // Tìm xem đã có đánh giá cho tiêu chí này chưa
    const existing = evaluations.find(ev => ev.content === criterionId);

    // Chuẩn bị payload chỉ gồm các trường backend yêu cầu
    const basePayload: any = {
      type: value,
      content: criterionId,
      score: value === "good" ? 3 : value === "average" ? 2 : 1,
      feedback: "",
      projectId: project.id,
    };
    // Nếu có taskId hợp lệ, thêm vào payload (ví dụ: nếu có taskId thì basePayload.taskId = taskId;)
    // Hiện tại không gửi taskId nếu không có

    try {
      if (existing) {
        console.log("Payload gửi lên (update):", basePayload);
        await evaluationService.updateEvaluation(existing.id, basePayload);
      } else {
        console.log("Payload gửi lên (create):", basePayload);
        await evaluationService.createEvaluation(basePayload);
      }
      // Sau khi cập nhật, reload lại danh sách đánh giá
      const data = await evaluationService.getEvaluationsByProject(project.id);
      setEvaluations(data);

      // Đồng bộ selections với dữ liệu mới nhất
      const newSelections: Record<string, EvaluationOption | null> = {
        planning: null,
        execution: null,
        effectiveness: null,
      };
      data.forEach(ev => {
        if (ev.content && ["planning", "execution", "effectiveness"].includes(ev.content)) {
          newSelections[ev.content] = ev.type as EvaluationOption;
        }
      });
      setSelections(newSelections);

      window.alert("Cập nhật đánh giá thành công!");
    } catch (error: any) {
      // Cải thiện log lỗi và thông báo
      if (error.response) {
        // Lỗi từ backend trả về (404, 500, ...)
        console.error("Lỗi backend:", error.response.status, error.response.data);
        window.alert(`Lỗi backend: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // Không nhận được phản hồi từ backend (Network Error, CORS)
        console.error("Không nhận được phản hồi từ backend (CORS hoặc server không chạy):", error.message);
        window.alert("Không thể kết nối tới server. Có thể do lỗi CORS hoặc server không chạy.\nChi tiết: " + error.message);
      } else {
        // Lỗi khác
        console.error("Lỗi không xác định:", error.message);
        window.alert("Lỗi không xác định: " + error.message);
      }
    }
  };

  return (
    <section className="bg-white border border-gray-200 shadow-sm rounded-xl px-6 py-10 text-base text-gray-800 max-md:px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {CRITERIA.map((criterion) => (
          <div
            key={criterion.id}
            className="flex items-center justify-between gap-6 min-h-[56px]"
          >
            {/* Label trái */}
            <span className="text-gray-700 w-[40%] font-medium">
              {criterion.label}
            </span>

            {/* Nút chọn phải */}
            <div className="flex gap-4 w-[60%] justify-end">
              {(["good", "average", "poor"] as EvaluationOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(criterion.id, option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                    selections[criterion.id] === option
                      ? statusColors[option]
                      : statusColors.base
                  }`}
                >
                  {option === "good"
                    ? "Tốt"
                    : option === "average"
                    ? "Trung bình"
                    : "Kém"}
                </button>
              ))}
            </div>
          </div>
        ))}
        {/* Hiển thị danh sách đánh giá từ API */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Danh sách đánh giá theo dự án:</h3>
          {loading ? (
            <div>Đang tải đánh giá...</div>
          ) : (
            <ul className="list-disc pl-5">
              {evaluations.map((item) => (
                <li key={item.id} className="mb-1">
                  <span className="font-medium">{item.type}</span> - {item.content} - <span className="text-blue-600">{item.score}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

// Main Dashboard Component
export default function ProjectManagementDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Quản lý dự án
        </h1>

        {/* Phase Progress */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Tiến độ giai đoạn
          </h2>
          <PhaseProgress project={{ /* dummy project for example */ id: 1, title: "Example Project", description: "", objectives: "", expectedOutcomes: "", startDate: "", endDate: "", researchTopicId: 1 }} />
        </div>

        {/* Project Evaluation */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Đánh giá dự án
          </h2>
          <ProjectEvaluation project={{ /* dummy project for example */ id: 1, title: "Example Project", description: "", objectives: "", expectedOutcomes: "", startDate: "", endDate: "", researchTopicId: 1 }} />
        </div>

        {/* Status Examples */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Ví dụ trạng thái
          </h2>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <StatusIndicator status="good" label="Tiến độ tốt" />
            <StatusIndicator status="average" label="Tiến độ trung bình" />
            <StatusIndicator status="poor" label="Tiến độ chậm" showIcon={true} />
          </div>
        </div>
      </div>
    </div>
  );
}