import React from "react";

interface RoleActionButtonProps {
  type: "assign" | "revoke";
}

export const RoleActionButton: React.FC<RoleActionButtonProps> = ({ type }) => {
  const buttonStyles = {
    assign: "px-4 py-1 text-cyan-800 bg-blue-300 rounded-xl",
    revoke: "px-7 py-1 text-red-800 bg-rose-400 rounded-xl max-md:px-5",
  };

  const buttonText = {
    assign: "Gán vai trò",
    revoke: "Thu hồi",
  };

  return (
    <button
      className={`text-sm font-medium leading-none ${buttonStyles[type]}`}
    >
      {buttonText[type]}
    </button>
  );
};
