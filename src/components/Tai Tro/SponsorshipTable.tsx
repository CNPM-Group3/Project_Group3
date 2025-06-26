import * as React from "react";
import { ProgressBar } from "./ProgressBar";

// Kiểu props nhận từ component cha
type SponsorshipTableProps = {
  sortOrder: "asc" | "desc";
};

interface SponsorshipItem {
  projectName: string;
  progress: number;
  amount: string;
  purpose: string;
  status: "completed" | "in-progress" | "rejected";
}

const initialData: SponsorshipItem[] = [
  {
    projectName: "New Work Les DO",
    progress: 33,
    amount: "10.000.000VND",
    purpose: "unknown",
    status: "completed",
  },
  {
    projectName: "You can Change the text and all",
    progress: 55,
    amount: "40.000.000VND",
    purpose: "unknown",
    status: "completed",
  },
  {
    projectName: "Landing Page Design",
    progress: 12,
    amount: "50.000.000VND",
    purpose: "unknown",
    status: "in-progress",
  },
  {
    projectName: "Landing Page Design",
    progress: 24,
    amount: "5.000.000VND",
    purpose: "unknown",
    status: "completed",
  },
  {
    projectName: "Landing Page Design",
    progress: 12,
    amount: "1.000.000VND",
    purpose: "unknown",
    status: "rejected",
  },
];

export const SponsorshipTable: React.FC<SponsorshipTableProps> = ({ sortOrder }) => {
  const [sponsorships, setSponsorships] = React.useState<SponsorshipItem[]>([]);

  // Sắp xếp lại mỗi khi sortOrder thay đổi
  React.useEffect(() => {
    const sorted = [...initialData].sort((a, b) =>
      sortOrder === "asc"
        ? a.projectName.localeCompare(b.projectName)
        : b.projectName.localeCompare(a.projectName)
    );
    setSponsorships(sorted);
  }, [sortOrder]);

  const handleStatusChange = (index: number, newStatus: SponsorshipItem["status"]) => {
    const updated = [...sponsorships];
    updated[index].status = newStatus;
    setSponsorships(updated);
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="hidden md:flex items-center text-gray-700 font-semibold text-lg px-3 py-2 border-b border-gray-300">
        <div className="w-[300px] px-3">Tên dự án</div>
        <div className="w-[140px] px-3">Số Tiền</div>
        <div className="flex-1 px-3">Mục đích</div>
        <div className="w-60 px-3">Trạng thái</div>
      </div>

      {/* Rows */}
      {sponsorships.map((item, index) => (
        <div
          key={`${item.projectName}-${index}`}
          className={`flex flex-wrap md:flex-nowrap items-center px-3 py-2 ${
            index % 2 === 1 ? "bg-slate-50" : ""
          } rounded-md max-md:gap-y-2`}
        >
          <div className="w-full md:w-[300px] text-sm font-medium text-neutral-800 px-3 truncate">
            {item.projectName}
          </div>
          {/* <div className="w-full md:w-28 text-sm text-neutral-700 px-3">
            {item.date}
          </div> */}
          {/*
          <div className="w-full md:w-[174px] px-3">
            <ProgressBar progress={item.progress} />
          </div>
          */}
          <div className="w-full md:w-[140px] text-sm text-neutral-700 px-3">
            {item.amount}
          </div>
          <div className="w-full md:w-[300px] text-sm font-medium text-neutral-800 px-3 truncate">
            {item.purpose}
          </div>
          <div className="w-full md:w-60 px-3 mt-2 md:mt-0">
            <select
              value={item.status}
              onChange={(e) =>
                handleStatusChange(index, e.target.value as SponsorshipItem["status"])
              }
              className={`w-full px-3 py-1 rounded border text-sm transition ${
                item.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : item.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <option value="completed">Duyệt</option>
              <option value="in-progress">Đang duyệt</option>
              <option value="rejected">Huỷ bỏ</option>
            </select>
          </div>
        </div>
      ))}
    </section>
  );
};