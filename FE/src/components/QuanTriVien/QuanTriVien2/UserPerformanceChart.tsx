"use client";
import * as React from "react";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserPerformanceChart: React.FC = () => {

  // Data for the pie chart (dummy data based on legend items)
  const data = {
    labels: ['Số phiên', 'Phản hồi TB', 'Tỷ lệ lỗi'],
    datasets: [
      {
        data: [60, 30, 10], // Example data representing proportions (adjust as needed)
        backgroundColor: [
          '#4299e1', // Màu xanh dương
          '#f6ad55', // Màu vàng cam
          '#f56565', // Màu đỏ
        ],
        borderColor: [
          '#3182ce',
          '#ed8936',
          '#e53e3e',
        ],
        borderWidth: 1,
      }],
  };

  // Options for the chart (optional)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
             const total = tooltipItem.dataset.data.reduce((sum: number, value: number) => sum + value, 0);
             const value = tooltipItem.raw;
             const percentage = ((value / total) * 100).toFixed(2);
             return `${tooltipItem.label}: ${value} (${percentage}%)`;
           }
        }
      }
    },
  };

  return (
    <section className="flex flex-col py-5 pr-10 pl-5 w-full rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:pr-5 max-md:mt-9 max-md:max-w-full">
      <h2 className="pb-2 max-w-full text-lg font-medium leading-none text-black w-[221px] max-md:pr-5">
        Hiệu suất người dùng
      </h2>

      <div className="flex gap-2 self-end px-2 pt-6 pb-2 max-w-full text-xs bg-white min-h-[270px] w-[459px]">
        <div className="flex flex-col flex-1 shrink py-11 font-semibold text-red-300 whitespace-nowrap basis-0 min-w-60">
          <div className="w-[200px] h-[200px] mx-auto">
             <Pie data={data} options={options} />
          </div>
        </div>

        <div className="flex overflow-hidden flex-col justify-center text-black">
          <div className="flex overflow-hidden gap-1 items-center p-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4299e1' }}></div>
            <span className="self-stretch my-auto">Số phiên (phiên)</span>
          </div>
          <div className="flex overflow-hidden gap-1 items-center p-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f6ad55' }}></div>
            <span className="self-stretch my-auto">Phản hồi TB (ms)</span>
          </div>
          <div className="flex overflow-hidden gap-1 items-center self-start p-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f56565' }}></div>
            <span className="self-stretch my-auto">Tỷ lệ lỗi (%)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
