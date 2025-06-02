import React from "react";

interface UserRoleFilterProps {
  roles: string[];
  selectedRole: string | null;
  onRoleSelect: (role: string | null) => void;
}

export const UserRoleFilter: React.FC<UserRoleFilterProps> = ({
  roles,
  selectedRole,
  onRoleSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 px-6 py-2.5 w-full text-base rounded-lg border border-solid border-slate-200 max-md:pr-5 max-md:max-w-full">
      <span className="grow my-auto text-slate-600">Lọc theo vai trò</span>
      <div className="flex flex-wrap flex-auto font-medium text-black max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab69d73d717cbc6050076b3bf3e3e159135cde2?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
          className="object-contain shrink-0 my-auto aspect-[1.12] w-[19px]"
          alt="Filter"
        />
        <div className="flex flex-wrap flex-auto gap-7 justify-center items-center">
          {roles.map((role, index) => (
            <button
              key={index}
              className={`self-stretch my-auto hover:text-blue-600 ${
                selectedRole === role ? "text-blue-600 font-bold" : ""
              }`}
              onClick={() => onRoleSelect(role === "Tất cả" ? null : role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
