interface TaskProps {
  title: string;
  status: string;
}

const tasks: TaskProps[] = [
  { title: "Nhiệm vụ 1", status: "Xong" },
  { title: "Nhiệm vụ 2", status: "Vấn đề" },
  { title: "Nhiệm vụ 3", status: "Đang làm" },
  { title: "Nhiệm vụ 1", status: "Xong" },
];

export const TaskList = () => {
  return (
    <section className="flex flex-col gap-5 px-8 pt-6 pb-6 bg-white rounded-xl border border-solid shadow-sm border-slate-200 w-[846px] max-md:w-full">
      <h2 className="text-xl font-bold text-gray-700">Nhiệm vụ</h2>
      <div className="flex flex-col gap-2.5">
        {tasks.map((task, index) => (
          <article key={index} className="flex justify-between items-center py-2.5 pr-3.5 pl-5 h-16 rounded-xl border border-solid bg-slate-50 border-slate-200">
            <div className="flex gap-7 items-center">
              <div className="flex relative justify-center items-center p-1 h-[46px] w-[46px]">
                <div className="absolute bg-teal-500 rounded-lg h-[46px] w-[46px]" />
                <div dangerouslySetInnerHTML={{
                  __html: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px; position: relative; z-index: 1">
                    <path d="M20 11.6667C20 9.89856 19.2976 8.20286 18.0474 6.95262C16.7971 5.70238 15.1014 5 13.3333 5H3.33331V30H15C16.3261 30 17.5978 30.5268 18.5355 31.4645C19.4732 32.4021 20 33.6739 20 35M20 11.6667V35M20 11.6667C20 9.89856 20.7024 8.20286 21.9526 6.95262C23.2028 5.70238 24.8985 5 26.6666 5H36.6666V30H25C23.6739 30 22.4021 30.5268 21.4644 31.4645C20.5268 32.4021 20 33.6739 20 35" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>`
                }} />
              </div>
              <h3 className="text-base font-semibold text-slate-600">{task.title}</h3>
            </div>
            <p className="px-4 py-2 text-sm font-bold rounded-lg">{task.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
