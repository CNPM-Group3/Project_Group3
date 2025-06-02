import * as React from "react";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex gap-2.5 items-center px-3 py-2.5">
      <div className="flex overflow-hidden flex-col items-start self-stretch my-auto bg-zinc-300 rounded-[100px] w-[74px]">
        <div
          className="flex shrink-0 h-2 bg-green-500 rounded-[100px]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="self-stretch my-auto text-sm text-green-500">
        {progress}%
      </div>
    </div>
  );
};
