"use client";
import * as React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Add interface for props
interface UserActivityLineChartProps {
  title: string; // Title for the chart
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const UserActivityLineChart: React.FC<UserActivityLineChartProps> = ({
  title
}) => {

  // Dummy data based on the image
  const data = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    datasets: [
      {
        label: 'Sinh viên',
        data: [90, 80, 75, 70, 65, 50, 40], // Example data
        borderColor: '#f87171', // Màu đỏ nhạt
        backgroundColor: 'rgba(248, 113, 113, 0.5)',
      },
      {
        label: 'Giảng viên',
        data: [12, 10, 9, 11, 10, 5, 3], // Example data
        borderColor: '#60a5fa', // Màu xanh dương nhạt
        backgroundColor: 'rgba(96, 165, 250, 0.5)',
      },
    ],
  };

  // Options for the line chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title, // Use the title prop here
        font: {
          size: 18,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
           display: true,
           text: 'Tương tác'
        }
      },
       x: {
        title: {
           display: true,
           text: 'Thời gian'
        }
      }
    }
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
}; 