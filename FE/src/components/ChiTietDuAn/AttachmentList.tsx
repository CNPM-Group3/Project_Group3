import React from "react";
import { AttachmentItem } from "./AttachmentItem";

interface Attachment {
  name: string;
  iconSrc: string;
}

interface AttachmentListProps {
  attachments?: Attachment[];
}

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
