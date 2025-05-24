interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  showViewDetails?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  showViewDetails = true
}) => {
  return (
    <article className="flex flex-col justify-between p-6 bg-white rounded-xl border border-solid shadow-sm border-slate-200 h-[150px] w-[266px] max-md:w-[calc(50%_-_8px)] max-sm:w-full">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-base leading-4 text-slate-500">{title}</h3>
        <div className="w-5 h-5">{icon}</div>
      </header>
      <p className="mb-4 text-2xl font-semibold text-black">{value}</p>
      {showViewDetails && (
        <button className="text-base font-medium text-right text-black cursor-pointer">
          Xem chi tiết →
        </button>
      )}
    </article>
  );
};