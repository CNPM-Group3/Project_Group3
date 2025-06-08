import React from 'react';

interface RoleActionButtonProps {
  type: 'assign' | 'revoke';
  onClick: () => void;
}

export const RoleActionButton: React.FC<RoleActionButtonProps> = ({ type, onClick }) => {
  const buttonStyles = {
    assign: "px-4 py-1 text-cyan-800 bg-blue-300 rounded-xl hover:bg-blue-400 transition-colors",
    revoke: "px-7 py-1 text-red-800 bg-rose-400 rounded-xl hover:bg-rose-500 transition-colors max-md:px-5",
  };

  const buttonText = {
    assign: "Gán vai trò",
    revoke: "Thu hồi",
  };

  return (
    <button
      className={`text-sm font-medium leading-none ${buttonStyles[type]}`}
      onClick={onClick}
    >
      {buttonText[type]}
    </button>
  );
}; 