import React from "react";

interface ProjectListItemProps {
  id: string;
  name: string;
  proposer: string;
  date: string;
  onView?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  actionType?: "approve" | "reject" | "both";
  renderActions: (actionType: "approve" | "reject" | "both" | undefined, onApprove: ((id: string) => void) | undefined, onReject: ((id: string) => void) | undefined, id: string) => React.ReactNode;
}

export const ProjectListItem: React.FC<ProjectListItemProps> = ({
  id,
  name,
  proposer,
  date,
  onView,
  onApprove,
  onReject,
  actionType = "both",
  renderActions
}) => {
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
      <div className="overflow-hidden grow shrink self-stretch px-6 py-4 my-auto w-20 text-center text-blue-600 underline whitespace-nowrap">
        <button onClick={() => onView?.(id)}>Xem</button>
      </div>
      <div className="flex overflow-hidden grow shrink gap-2.5 self-stretch px-6 py-4 my-auto text-sm font-medium leading-none w-[184px] justify-center">
        {renderActions(actionType, onApprove, onReject, id)}
      </div>
    </div>
  );
};