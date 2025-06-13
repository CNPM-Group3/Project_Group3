"use client";

import React, { useRef, useState } from "react";
import { NotificationList } from "./Notification/NotificationList";
import { NotificationBadge } from "./Notification/NotificationBadge";

const Header: React.FC = () => {
  const bellRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full h-[80px] px-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
      {/* Search bar */}
      <div className="flex items-center w-[360px] rounded-lg border border-gray-200 px-3 py-2 bg-gray-100">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/740dad832ca79bca37bd5f3a73439f4f8e85fbee?placeholderIfAbsent=true"
          alt="Search"
          className="w-4 h-4"
        />
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="ml-2 w-full text-sm bg-transparent outline-none placeholder-gray-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Icon 1 - Tin nhắn SVG */}
        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-[#34ACB2] cursor-pointer">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#34ACB2"/>
            <path d="M24.8291 10.5H25.6094C28.5112 10.6659 31.261 11.8264 33.4004 13.7773L33.8213 14.1787C36.0143 16.3718 37.323 19.2948 37.5 22.3906V23.1709C37.5048 25.0116 37.1021 26.8291 36.3223 28.4932L36.1611 28.8242L36.1582 28.8291C35.1068 30.9328 33.4904 32.7024 31.4902 33.9395C29.6151 35.0991 27.4718 35.7478 25.2734 35.8252L24.833 35.833H24.8291C22.9883 35.8378 21.1709 35.4351 19.5068 34.6553L19.1768 34.4941C18.8643 34.3363 18.5074 34.2935 18.1689 34.3701L18.0254 34.4102L11.3711 36.6279L13.5898 29.9746C13.7163 29.5954 13.686 29.1811 13.5059 28.8242C12.6759 27.181 12.2203 25.3753 12.1709 23.5381L12.167 23.1709V23.167C12.1679 20.9623 12.7438 18.7986 13.835 16.8887L14.0605 16.5098C15.2202 14.6346 16.848 13.0971 18.7803 12.0459L19.1709 11.8418L19.1768 11.8389C20.8198 11.009 22.6249 10.5543 24.4619 10.5049L24.8291 10.5Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        {/* Icon 2 - Chuông thông báo */}
        <div className="relative" ref={bellRef}>
          <div
            className="w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-[#33AAB1] cursor-pointer"
            onClick={() => setOpen((o) => !o)}
          >
            <NotificationBadge />
          </div>
          {open && (
            <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg z-50 max-h-[400px] overflow-y-auto">
              <NotificationList />
            </div>
          )}
        </div>

        {/* Icon 3 - Tài khoản SVG */}
        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-[8px] bg-white cursor-pointer">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_515_873)">
              <path d="M37.4062 36.0188C35.3344 32.4188 31.4438 30 27 30H21C16.5562 30 12.6656 32.4188 10.5938 36.0188C13.8938 39.6938 18.675 42 24 42C29.325 42 34.1063 39.6844 37.4062 36.0188ZM0 24C0 17.6348 2.52856 11.5303 7.02944 7.02944C11.5303 2.52856 17.6348 0 24 0C30.3652 0 36.4697 2.52856 40.9706 7.02944C45.4714 11.5303 48 17.6348 48 24C48 30.3652 45.4714 36.4697 40.9706 40.9706C36.4697 45.4714 30.3652 48 24 48C17.6348 48 11.5303 45.4714 7.02944 40.9706C2.52856 36.4697 0 30.3652 0 24ZM24 25.5C25.7902 25.5 27.5071 24.7888 28.773 23.523C30.0388 22.2571 30.75 20.5402 30.75 18.75C30.75 16.9598 30.0388 15.2429 28.773 13.977C27.5071 12.7112 25.7902 12 24 12C22.2098 12 20.4929 12.7112 19.227 13.977C17.9612 15.2429 17.25 16.9598 17.25 18.75C17.25 20.5402 17.9612 22.2571 19.227 23.523C20.4929 24.7888 22.2098 25.5 24 25.5Z" fill="#018489"/>
            </g>
            <defs>
              <clipPath id="clip0_515_873">
                <path d="M0 0H48V48H0V0Z" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;