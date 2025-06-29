import React, { useState } from "react";

export const ProjectTypeSection = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <section className="flex flex-wrap gap-5 justify-between px-7 py-4 mt-6 w-full rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5">
      <div className="text-xl font-bold leading-5 text-slate-600">
        <span className="text-gray-700">Dự án do doanh nghiệp tài trợ</span>
        <br />
        <span className="font-normal text-xs text-gray-700">
          Chọn nếu dự án của bạn được tài trợ bởi doanh nghiệp
        </span>
      </div>
      {/* Toggle Switch */}
      <button
        type="button"
        aria-pressed={isChecked}
        onClick={() => setIsChecked((v) => !v)}
        className={`relative w-16 h-10 rounded-full transition-colors duration-300 ${
          isChecked ? "bg-sky-200" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-teal-500 transition-all duration-300 ${
            isChecked ? "translate-x-6" : ""
          }`}
        />
      </button>
    </section>
  );
};

export const UserInfoSection = () => {
  return (
    <section className="px-6 py-5 mt-3 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:max-w-full">
      <h2 className="text-xl font-bold leading-5 text-gray-700">
        Thông tin người đăng ký
      </h2>
      <div className="mt-4 px-4 py-3 text-xs leading-loose text-red-900 bg-rose-200 rounded-lg text-center max-w-[1000px] mx-auto">
        Vui lòng cập nhật thông tin cá nhân và thông tin nghiên cứu của bạn rồi hãy tiếp tục
      </div>
    </section>
  );
};

export const ProjectDetailsSection = () => {
  return (
    <section className="flex flex-col px-7 py-6 mt-3 w-full rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mr-0.5 max-md:max-w-full">
      <h2 className="self-start text-xl font-bold leading-none text-gray-700">
        Chi tiết dự án
      </h2>
      <div className="flex flex-wrap gap-2.5 mt-5 w-full text-base leading-6 text-gray-700 max-md:max-w-full">
        <input
          type="text"
          placeholder="Tên dự án"
          className="overflow-hidden flex-auto gap-2.5 self-stretch px-4 bg-white rounded-lg border border-gray-300 border-solid min-h-[50px] w-[448px] max-md:max-w-full text-gray-700 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Viết tắt"
          className="overflow-hidden flex-auto gap-2.5 self-stretch px-4 bg-white rounded-lg border border-gray-300 border-solid min-h-[50px] w-[222px] text-gray-700 placeholder-gray-500"
        />
      </div>
      <div className="mt-1.5 bg-black bg-opacity-0 max-md:max-w-full">
        <label className="py-1.5 text-sm font-bold bg-black bg-opacity-0 text-slate-600 max-md:pr-5 max-md:max-w-full">
          Ghi chú:
        </label>
        <textarea
          placeholder="Ghi tối đa 10 ký tự"
          className="overflow-hidden px-3.5 pt-4 pb-12 mt-2 text-base text-gray-700 bg-white rounded-md border border-gray-300 border-solid w-full max-md:pr-5 max-md:max-w-full placeholder-gray-500"
        />
      </div>
    </section>
  );
};

export const TeamAndDocumentsSection = () => {
  return (
    <section className="flex flex-col px-7 py-7 mt-3 text-sm rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mr-0.5 max-md:max-w-full">
      <h2 className="self-start text-xl font-bold leading-none text-gray-700">
        Thành viên và tài liệu
      </h2>
      <div className="mt-3.5 w-full">
        <label className="font-bold text-gray-700 max-md:max-w-full">
          Số lượng thành viên :
        </label>
        <div className="flex flex-wrap items-center mt-2 w-full border-solid bg-white border border-gray-300 gap-2 min-h-10 min-w-60 p-3 rounded-lg text-gray-700">
          <span className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full">
            Thành viên (Bao gồm cả bạn)
          </span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/d0e980bbfa3fd613fdaa0fbc8027968755d13692?placeholderIfAbsent=true"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          />
        </div>
      </div>
      <label className="self-start mt-3 font-bold text-slate-600">
        Tài liệu dự án
      </label>
      <div className="flex flex-col justify-center items-center px-20 py-7 mt-3 text-center text-gray-600 bg-white rounded-lg border-2 border-gray-300 border-dashed max-md:px-5 max-md:mr-1 max-md:max-w-full">
        <div className="flex flex-col max-w-full w-[198px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/823bf4beb2774bc99c68daa06d856dec/4af6dbef6e38eaeb4a4d23ec77babee875c63e76?placeholderIfAbsent=true"
            alt=""
            className="object-contain self-center aspect-[1.27] w-[38px]"
          />
          <button
            type="button"
            className="px-5 py-1 mt-2 text-base font-medium text-teal-700 bg-teal-100 rounded hover:bg-teal-200 transition"
          >
            Tải file
          </button>
        </div>
      </div>
    </section>
  );
};