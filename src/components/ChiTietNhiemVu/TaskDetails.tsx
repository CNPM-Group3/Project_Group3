import React from 'react';

interface TaskDetailsProps {
  description?: string;
  deadline?: string;
  assignee?: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  description,
  deadline,
  assignee
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Chi tiết nhiệm vụ</h2>
      
      <div className="space-y-4">
        {description && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Mô tả</h3>
            <p className="mt-1 text-gray-900">{description}</p>
          </div>
        )}
        
        {deadline && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Hạn hoàn thành</h3>
            <p className="mt-1 text-gray-900">{deadline}</p>
          </div>
        )}
        
        {assignee && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Người thực hiện</h3>
            <p className="mt-1 text-gray-900">{assignee}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;