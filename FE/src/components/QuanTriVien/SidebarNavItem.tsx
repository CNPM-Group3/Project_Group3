import React from "react";

interface SidebarNavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

export function SidebarNavItem({ icon, label, isActive }: SidebarNavItemProps) {
  const baseClasses = "flex gap-3 p-4 mt-1.5 w-full";
  const activeClasses = isActive
    ? "bg-blue-50 rounded-lg"
    : "bg-black bg-opacity-0";
  const textClasses = isActive ? "text-blue-600" : "text-slate-600";

  return (
    <li className={`${baseClasses} ${activeClasses}`}>
      <div className="flex overflow-hidden justify-center items-center min-h-4">
        <img
          src={icon}
          alt=""
          className="object-contain self-stretch my-auto w-4 aspect-square"
        />
      </div>
      <span
        className={`grow shrink w-40 text-base font-semibold leading-none ${textClasses}`}
      >
        {label}
      </span>
    </li>
  );
}
