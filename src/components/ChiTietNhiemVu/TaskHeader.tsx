import React from 'react';

interface TaskHeaderProps {
  title?: string;
  status?: string;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ title, status }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-900">{title || 'Chi tiết nhiệm vụ'}</h1>
      {status && (
        <div className="mt-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {status}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskHeader;