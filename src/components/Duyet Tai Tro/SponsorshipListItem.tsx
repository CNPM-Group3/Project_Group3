import React from "react";

interface SponsorshipListItemProps {
  id: string;
  name: string;
  proposer: string;
  date: string;
  amount: number;
  onView?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  actionType?: "approve" | "reject" | "both";
}

const SponsorshipListItem: React.FC<SponsorshipListItemProps> = ({
  id,
  name,
  proposer,
  date,
  amount,
  onView,
  onApprove,
  onReject,
  actionType = "both"
}) => {
  return (
    <tr className="bg-white hover:bg-gray-50 transition border-b border-gray-200 last:border-b-0">
      <td className="px-4 py-3 text-center align-middle">{id}</td>
      <td className="px-6 py-3 text-left align-middle">{name}</td>
      <td className="px-6 py-3 text-left align-middle">{proposer}</td>
      <td className="px-6 py-3 text-right align-middle">
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}
      </td>
      <td className="px-6 py-3 text-center align-middle">{date}</td>
      <td className="px-6 py-3 text-center align-middle">
        <button 
          className="text-blue-600 underline hover:text-blue-800" 
          onClick={() => onView?.(id)}
        >
          Xem
        </button>
      </td>
      <td className="px-6 py-3 text-center align-middle">
        <div className="flex flex-row items-center justify-center gap-2">
          {(actionType === "approve" || actionType === "both") && (
            <button
              className="px-4 py-1 text-teal-700 bg-sky-100 rounded-xl min-h-[21px] w-20 hover:bg-sky-200 disabled:opacity-50"
              onClick={() => onApprove?.(id)}
            >
              Duyệt
            </button>
          )}
          {(actionType === "reject" || actionType === "both") && (
            <button
              className="px-4 py-1 text-red-700 bg-rose-100 rounded-xl min-h-[21px] w-24 whitespace-nowrap hover:bg-rose-200 disabled:opacity-50"
              onClick={() => onReject?.(id)}
            >
              Từ chối
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default SponsorshipListItem;