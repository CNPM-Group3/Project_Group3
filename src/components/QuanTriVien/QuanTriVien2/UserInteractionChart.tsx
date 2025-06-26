"use client";
import * as React from "react";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserInteractionChart: React.FC = () => {

  // Data for the donut chart based on the image
  const data = {
    labels: ['Giảng viên', 'Sinh viên', 'Nhân viên', 'Quản trị viên'],
    datasets: [
      {
        data: [20, 300, 15, 5], // Số lượng người dùng
        backgroundColor: [
          '#93c5fd', // Màu xanh dương nhạt cho Giảng viên
          '#fca5a5', // Màu đỏ nhạt cho Sinh viên
          '#a7f3d0', // Màu xanh lá nhạt cho Nhân viên
          '#fde68a', // Màu vàng nhạt cho Quản trị viên
        ],
        borderColor: [
          '#60a5fa',
          '#f87171',
          '#6ee7b7',
          '#fcd34d',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart (optional, but can customize title, tooltips, etc.)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the default legend provided by Chart.js
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            // Customize tooltip to show count and percentage
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
    <section className="flex flex-col items-start pt-6 pr-12 pb-3.5 pl-5 mt-8 max-w-full rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] w-[541px] max-md:pr-5">
      <h2 className="z-10 pb-2.5 max-w-full text-lg font-medium leading-none text-black w-[221px] max-md:pr-5">
        Thống kê người dùng theo vai trò
      </h2>

      <div className="flex flex-col items-center w-full px-4 mt-4 gap-6">
        <div className="w-full max-w-[300px] mx-auto">
           <Doughnut data={data} options={options} />
        </div>

        <div className="flex flex-wrap justify-center items-center w-full text-xs text-black gap-6">
          <div className="flex gap-1 items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/07a945ed3e085f09938a9c6e84e701d277235af7?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              style={{ backgroundColor: '#fca5a5', borderRadius: '50%' }}
            />
            <span className="self-stretch my-auto">Sinh viên</span>
          </div>
          <div className="flex gap-1 items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/46f7f9a683b363f27d820d9d44a9bfc3fc5643ae?placeholderIfAbsent=true&apiKey=348dfa683b363f27d820d9d44a9bfc3fc5643ae"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              style={{ backgroundColor: '#93c5fd', borderRadius: '50%' }}
            />
            <span className="self-stretch my-auto">Giảng viên</span>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#a7f3d0' }}></div>
            <span>Nhân viên</span>
          </div>
          <div className="flex gap-1 items-center">
             <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#fde68a' }}></div>
            <span>Quản trị viên</span>
          </div>
        </div>
      </div>
    </section>
  );
};