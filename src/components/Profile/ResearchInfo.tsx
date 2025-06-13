export const ResearchInfo = () => {
  return (
    <section className="flex flex-col grow px-14 py-16 text-gray-700 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-center text-xl font-bold text-center">
        Thông tin nghiên cứu
      </h2>

      <div className="flex flex-col mt-10 text-sm">
        <p>
          <strong className="text-gray-700">Vai trò:</strong>
          <span className="text-gray-700"> Thành viên nghiên cứu</span>
        </p>

        <p className="self-start mt-3.5 text-center">
          <strong className="text-gray-700">Lĩnh vực nghiên cứu:</strong>
          <span className="text-gray-700"> Công nghệ vi mạch bán dẫn</span>
        </p>

        <p className="mt-3.5">
          <strong className="text-gray-700">Số dự án:</strong>
          <span className="text-gray-700"> 08</span>
        </p>

        <p className="mt-3.5">
          <strong className="text-gray-700">Link Github:</strong>
        </p>
      </div>
    </section>
  );
};
