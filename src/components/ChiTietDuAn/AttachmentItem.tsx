import React from "react";

interface AttachmentItemProps {
  name: string;
  iconSrc: string;
}

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
