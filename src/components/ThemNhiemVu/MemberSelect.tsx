"use client";
import React, { useState } from "react";

interface MemberSelectProps {
  members: string[]; // List of member names
  onMemberSelect: (member: string) => void; // Callback when a member is selected
}

export const MemberSelect: React.FC<MemberSelectProps> = ({
  members,
  onMemberSelect,
}) => {
  const [selectedMember, setSelectedMember] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleMemberSelect = (member: string) => {
    setSelectedMember(member);
    setIsOpen(false);
    onMemberSelect(member); // Call the prop function with the selected member
  };

  return (
    <div className="flex flex-wrap gap-7 mt-8 w-full max-md:mr-1 max-md:max-w-full relative">
      <label className="shrink my-auto w-52 text-xl font-bold basis-auto grow-0 text-slate-600">
        Thành viên nhận nhiệm vụ:
      </label>

      {/* Styled select box */}
      <div
        className="flex flex-wrap flex-auto items-center text-sm border border-gray-400 rounded-md px-4 py-2 bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`flex-1 shrink self-stretch my-auto basis-0 ${selectedMember ? 'text-gray-800' : 'text-gray-400'}`}>
          {selectedMember || "Tên thành viên"}
        </span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0e980bbfa3fd613fdaa0fbc8027968755d13692?placeholderIfAbsent=true&apiKey=c7bfdd715a654a2987e94b52aaf52c4a"
          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          alt="Dropdown arrow"
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-12 w-full max-w-sm bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {members.map((member, index) => (
            <div
              key={index}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer first:rounded-t-md last:rounded-b-md"
              onClick={() => handleMemberSelect(member)}
            >
              {member}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};