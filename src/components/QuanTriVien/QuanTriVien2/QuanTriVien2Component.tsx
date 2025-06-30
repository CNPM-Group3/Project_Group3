"use client";
import * as React from "react";
import { ApiUser } from "@cnpm/services/userService";
import { Doughnut, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { useState, useEffect } from "react";
import { getUsersByRole, addRoleToUser, deleteRoleFromUser } from "@cnpm/services/userService";

// Register Chart.js components globally for this file
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

// --- Interface Definitions ---

interface RoleActionButtonProps {
  type: "assign" | "revoke";
  onClick?: () => void;
}

interface UserPerformanceChartProps {
  users: ApiUser[];
}

interface UserInteractionChartProps {
  users: ApiUser[];
}

interface RoleFilterProps {
  roles: string[];
  selectedRole: string | null;
  onSelectRole: (role: string | null) => void;
}

interface TimeFilterProps {
  timeRanges: string[];
  selectedTimeRange: string | null;
  onSelectTimeRange: (timeRange: string) => void;
  className?: string;
  disabled?: boolean;
  onChange?: (timeRange: string) => void;
  defaultValue?: string;
}

interface UserListProps {
  users: ApiUser[];
}

interface UserActivityLineChartProps {
  title: string;
  users: ApiUser[];
}

// --- Component Definitions ---

// RoleActionButton Component (local to this file, primarily for UserList)
const RoleActionButton: React.FC<RoleActionButtonProps> = ({ type, onClick }) => {
  const buttonStyles = {
    assign: "px-4 py-1 text-cyan-800 bg-blue-300 rounded-xl",
    revoke: "px-7 py-1 text-red-800 bg-rose-400 rounded-xl max-md:px-5",
  };

  const buttonText = {
    assign: "Gán vai trò",
    revoke: "Thu hồi",
  };

  return (
    <button
      className={`text-sm font-medium leading-none ${buttonStyles[type]}`}
      onClick={onClick}
    >
      {buttonText[type]}
    </button>
  );
};

// RoleFilter Component
export const RoleFilter: React.FC<RoleFilterProps> = ({
  roles,
  selectedRole,
  onSelectRole,
}) => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-4 rounded-2xl border bg-white shadow flex flex-col items-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.586a2 2 0 00-.293-1.121L2.293 6.707A1 1 0 012 6V4z" />
        </svg>
        <span className="text-slate-700 font-semibold text-lg">Vai trò</span>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-3 w-full">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onSelectRole(role === "Tất cả" ? null : role)}
            className={`px-4 py-2 rounded-full text-base font-semibold border transition
              ${selectedRole === role || (selectedRole === null && role === "Tất cả")
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-blue-400 shadow'
                : 'bg-white text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600'}
            `}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

// TimeFilter Component
export const TimeFilter: React.FC<TimeFilterProps> = ({
  timeRanges,
  selectedTimeRange,
  onSelectTimeRange,
  className = "",
  disabled = false,
  onChange,
  defaultValue
}) => {
  const handleTimeRangeSelect = (range: string) => {
    if (!disabled) {
      onSelectTimeRange(range);
      onChange?.(range);
    }
  };

  return (
    <div className={`mx-auto max-w-3xl px-6 py-4 rounded-2xl border bg-white shadow flex flex-col items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-2 text-slate-500">
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.586a2 2 0 00-.293-1.121L2.293 6.707A1 1 0 012 6V4z" />
        </svg>
        <span className="text-slate-700 font-semibold text-lg">Thời gian</span>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-3 w-full">
        {timeRanges.map((range) => (
          <button
            key={range}
            className={`px-4 py-2 rounded-full text-base font-semibold border transition
              ${selectedTimeRange === range
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-blue-400 shadow'
                : 'bg-white text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600'}
              ${disabled ? 'cursor-not-allowed' : ''}`}
            onClick={() => handleTimeRangeSelect(range)}
            disabled={disabled}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

// UserInteractionChart Component
export const UserInteractionChart: React.FC<UserInteractionChartProps> = ({ users }) => {
  const safeUsers = Array.isArray(users) ? users : [];
  const roleCounts = safeUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(roleCounts);
  const dataValues = Object.values(roleCounts);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          '#93c5fd', // Light blue
          '#fca5a5', // Light red
          '#a7f3d0', // Light green
          '#fde68a', // Light yellow
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            const total = tooltipItem.dataset.data.reduce((sum: number, value: number) => sum + value, 0);
            const value = tooltipItem.raw as number;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
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
          {Object.entries(roleCounts).map(([role, count]) => (
            <div key={role} className="flex gap-1 items-center">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: data.datasets[0].backgroundColor[labels.indexOf(role)] }}></div>
              <span>{role} ({count})</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// UserPerformanceChart Component
export const UserPerformanceChart: React.FC<UserPerformanceChartProps> = ({ users }) => {
  const safeUsers = Array.isArray(users) ? users : [];
  const activeUsers = safeUsers.filter(user => user.status === 'ACTIVE').length;
  const totalUsers = safeUsers.length;
  const performancePercentage = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;

  const data = {
    labels: ['Người dùng hoạt động', 'Tổng số người dùng'],
    datasets: [
      {
        data: [activeUsers, totalUsers - activeUsers], // Representing active vs inactive users
        backgroundColor: [
          '#4299e1', // Blue for active users
          '#a0aec0', // Grey for inactive users
        ],
        borderColor: [
          '#3182ce',
          '#718096',
        ],
        borderWidth: 1,
      }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
             const total = tooltipItem.dataset.data.reduce((sum: number, value: number) => sum + value, 0);
             const value = tooltipItem.raw as number;
             const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
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
            <span className="self-stretch my-auto">Người dùng hoạt động ({performancePercentage.toFixed(1)}%)</span>
          </div>
          <div className="flex overflow-hidden gap-1 items-center p-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#a0aec0' }}></div>
            <span className="self-stretch my-auto">Tổng số người dùng ({totalUsers})</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// UserList Component
export const UserList: React.FC<UserListProps> = ({ users }) => {
  const safeUsers = Array.isArray(users) ? users : [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userList, setUserList] = useState<ApiUser[]>([]);

  const handleAssignRole = async (userId: number, roleName: string) => {
    try {
      await addRoleToUser(userId, roleName);
      // Refresh the user list after role assignment
      const fetchedUsers = await getUsersByRole('all');
      setUserList(fetchedUsers);
    } catch (err) {
      console.error('Error assigning role:', err);
      setError('Không thể gán vai trò. Vui lòng thử lại sau.');
    }
  };

  const handleRevokeRole = async (userId: number, roleName: string) => {
    try {
      await deleteRoleFromUser(userId, roleName);
      // Refresh the user list after role revocation
      const fetchedUsers = await getUsersByRole('all');
      setUserList(fetchedUsers);
    } catch (err) {
      console.error('Error revoking role:', err);
      setError('Không thể thu hồi vai trò. Vui lòng thử lại sau.');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedUsers = await getUsersByRole('all');
        setUserList(fetchedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="pt-6 mt-6 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <div className="text-center text-red-500 p-4 font-semibold">
          {error}
        </div>
      </section>
    );
  }

  if (userList.length === 0) {
    return (
      <section className="pt-6 mt-6 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <div className="text-center text-gray-500 p-4">
          Không tìm thấy người dùng nào.
        </div>
      </section>
    );
  }

  return (
    <section className="pt-6 mt-6 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white">
      <h2 className="text-lg font-semibold px-6 pb-4">Danh sách</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-t border-gray-200">
          <thead>
            <tr className="text-left text-sm text-gray-500 bg-gray-50">
              <th className="px-6 py-3">Họ tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Vai trò</th>
              <th className="px-6 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {userList.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-2">
                    <RoleActionButton 
                      type="assign" 
                      onClick={() => handleAssignRole(user.id, user.role)}
                    />
                    <RoleActionButton 
                      type="revoke" 
                      onClick={() => handleRevokeRole(user.id, user.role)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// UserActivityLineChart Component
export const UserActivityLineChart: React.FC<UserActivityLineChartProps> = ({
  title,
  users
}) => {
  const safeUsers = Array.isArray(users) ? users : [];
  const activityData = React.useMemo(() => {
    // In a real application, you would process the 'users' prop to calculate activity data
    // For now, let's keep the random data generation as a placeholder
    return {
      'Thứ 2': Math.floor(Math.random() * 100),
      'Thứ 3': Math.floor(Math.random() * 100),
      'Thứ 4': Math.floor(Math.random() * 100),
      'Thứ 5': Math.floor(Math.random() * 100),
      'Thứ 6': Math.floor(Math.random() * 100),
      'Thứ 7': Math.floor(Math.random() * 100),
      'Chủ nhật': Math.floor(Math.random() * 100),
    };
  }, [safeUsers]); // Re-run memoization if users prop changes

  const data = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    datasets: [
      {
        label: 'Tương tác người dùng',
        data: Object.values(activityData),
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.5)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title,
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
           text: 'Số lượng'
        }
      },
       x: {
        title: {
           display: true,
           text: 'Ngày'
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