import React from "react";

interface NavigationItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  isActive,
}) => {
  const baseClasses = "flex gap-3 py-3 px-4 rounded-lg w-full";
  const activeClasses = isActive ? "bg-blue-50" : "bg-black bg-opacity-0";
  const textClasses = isActive ? "text-blue-600" : "text-slate-600";

  return (
    <li className="mt-1.5">
      <div className={`${baseClasses} ${activeClasses}`}>
        <div className="flex overflow-hidden justify-center items-center min-h-4">
          <img
            src={icon}
            className="object-contain self-stretch my-auto w-4 aspect-square"
            alt=""
          />
        </div>
        <span className={`text-base font-semibold ${textClasses}`}>
          {label}
        </span>
      </div>
    </li>
  );
};
