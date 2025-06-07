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

export const SponsorshipListItem: React.FC<SponsorshipListItemProps> = ({
  id,
  name,
  proposer,
  date,
  amount,
  onView,
  onApprove,
  onReject,
  actionType = "both",
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="flex flex-wrap items-center w-full text-base font-normal border-b border-gray-100 last:border-b-0 max-md:max-w-full">
      <div className="overflow-hidden grow shrink self-stretch px-4 py-2 my-auto whitespace-nowrap w-[81px] text-center">
        {id}
      </div>
      <div className="overflow-hidden grow shrink self-stretch px-6 py-4 my-auto min-w-60 w-[334px] text-left">
        {name}
      </div>
      <div className="overflow-hidden grow shrink self-stretch px-6 py-4 my-auto w-[179px] text-left">
        {proposer}
      </div>
      <div className="overflow-hidden grow shrink self-stretch px-6 py-4 my-auto whitespace-nowrap w-[119px] text-center">
        {date}
      </div>
      <div className="overflow-hidden grow shrink self-stretch px-6 py-4 my-auto whitespace-nowrap w-[150px] text-right">
        {formatAmount(amount)}
      </div>
      <div className="overflow-hidden grow shrink self-stretch px-6 py-4 my-auto w-20 text-center text-blue-600 underline whitespace-nowrap">
        <button onClick={() => onView?.(id)}>Xem</button>
      </div>
      <div className="flex overflow-hidden grow shrink gap-2.5 self-stretch px-6 py-4 my-auto text-sm font-medium leading-none w-[184px] justify-center">
        {(actionType === "approve" || actionType === "both") && (
          <button
            className="px-4 py-1 text-teal-700 whitespace-nowrap bg-sky-200 rounded-xl min-h-[21px]"
            onClick={() => onApprove?.(id)}
          >
            Duyệt
          </button>
        )}
        {(actionType === "reject" || actionType === "both") && (
          <button
            className="px-2.5 py-1 text-red-900 bg-rose-200 rounded-xl min-h-[21px]"
            onClick={() => onReject?.(id)}
          >
            Từ chối
          </button>
        )}
      </div>
    </div>
  );
};