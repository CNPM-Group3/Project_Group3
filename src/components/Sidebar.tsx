"use client";

import React from "react";

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/eab83ce3769a682628746e736e2c44dbf0bdad9e?placeholderIfAbsent=true",
    label: "Trang chủ",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f3e88bfa9ae998efe3390d97326af3323f959e8e?placeholderIfAbsent=true",
    label: "Thông tin cá nhân",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/548976d608c31c0e145581e31116c4038add5580?placeholderIfAbsent=true",
    label: "Dự án",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/0c3c53abe8367c35966fb2cd9e6e663a994463d9?placeholderIfAbsent=true",
    label: "Đội",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/483d2bb0cfca4845368f546fb5cd08b5e805477f?placeholderIfAbsent=true",
    label: "Đánh giá",
    active: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/e84f75a28ad473788606c62583a5fed72ab176a5?placeholderIfAbsent=true",
    label: "Cài Đặt",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/08232af02813e185a2f8fc37b028087b250d5b28?placeholderIfAbsent=true",
    label: "Đăng Xuất",
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="grow border border-solid border-slate-200 pb-[560px] max-md:pb-24">
      <header className="flex flex-col justify-center px-9 py-4 border-b bg-black bg-opacity-0 border-slate-200 max-md:px-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/f97f13d9cd69d09e5640a65bf4466139ca5ca8ae?placeholderIfAbsent=true"
          alt="Logo"
          className="object-contain aspect-[5.68] w-[182px]"
        />
      </header>
      <nav className="px-4 pt-4 pb-2">
        <ul className="w-full">
          {navigationItems.map((item, index) => (
            <li key={index} className="mt-1.5 first:mt-0">
              <div
                className={`flex gap-3 p-4 w-full rounded-lg ${
                  item.active ? "bg-blue-50" : "bg-transparent"
                }`}
              >
                <div className="flex overflow-hidden justify-center items-center min-h-4">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="object-contain self-stretch my-auto w-4 aspect-square"
                  />
                </div>
                <span className="grow shrink text-base font-semibold leading-none text-slate-600">
                  {item.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
