import React, { useState } from "react";

interface ProjectInfoProps {
  name?: string;
  phone?: string;
  email?: string;
  onNameChange?: (value: string) => void;
  onPhoneChange?: (value: string) => void;
  onEmailChange?: (value: string) => void;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  name: initialName = "",
  phone: initialPhone = "",
  email: initialEmail = "",
  onNameChange,
  onPhoneChange,
  onEmailChange,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);

  const handleNameChange = (value: string) => {
    setName(value);
    onNameChange?.(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    onPhoneChange?.(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    onEmailChange?.(value);
  };

  return (
    <section className="flex flex-col px-7 py-11 mt-6 w-full rounded-xl border border-solid border-slate-200 max-w-[1069px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:max-w-full">
      {/* Nếu cần icon hoặc nút, đặt ở đây */}
      <div className="flex items-center justify-center w-full mb-4 relative">
        <h2 className="text-2xl font-semibold text-slate-600 text-center w-full">
          Thông tin người hướng dẫn
        </h2>
        {/* Nếu có nút tạo dự án, đặt ở đây, ví dụ: */}
        {/* <button className="absolute right-0 text-blue-500">+ Tạo dự án</button> */}
      </div>
      <div className="mt-1.5 w-full text-base text-left flex flex-col gap-4">
        <label className="text-slate-600 flex flex-col">
          Tên:
          <input
            type="text"
            className="mt-1 px-3 py-2 border rounded outline-none"
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            placeholder="Nhập tên"
          />
        </label>
        <label className="text-slate-600 flex flex-col">
          Số điện thoại:
          <input
            type="text"
            className="mt-1 px-3 py-2 border rounded outline-none"
            value={phone}
            onChange={e => handlePhoneChange(e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </label>
        <label className="text-slate-600 flex flex-col">
          Email:
          <input
            type="email"
            className="mt-1 px-3 py-2 border rounded outline-none"
            value={email}
            onChange={e => handleEmailChange(e.target.value)}
            placeholder="Nhập email"
          />
        </label>
      </div>
    </section>
  );
};
