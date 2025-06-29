import React, { useState, useEffect } from 'react';

export interface NewTaskData {
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  assignedToId: number;
  isMilestone: boolean;
  attachmentUrls?: string;
}

interface TaskFormProps {
  onSubmit: (data: NewTaskData) => void;
  members: { id: number; name: string }[];
  isSubmitting?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  members = [], 
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState<NewTaskData>({
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    assignedToId: 0,
    isMilestone: false,
    attachmentUrls: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Validate form trước khi submit
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Kiểm tra tiêu đề
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề nhiệm vụ không được để trống';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Tiêu đề nhiệm vụ phải có ít nhất 3 ký tự';
    }

    // Kiểm tra mô tả
    if (!formData.description.trim()) {
      newErrors.description = 'Nội dung nhiệm vụ không được để trống';
    }

    // Kiểm tra ngày bắt đầu
    if (!formData.startDate) {
      newErrors.startDate = 'Ngày bắt đầu không được để trống';
    }

    // Kiểm tra thời hạn
    if (!formData.dueDate) {
      newErrors.dueDate = 'Thời hạn hoàn thành không được để trống';
    }

    // Kiểm tra logic ngày
    if (formData.startDate && formData.dueDate) {
      const startDate = new Date(formData.startDate);
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today) {
        newErrors.startDate = 'Ngày bắt đầu không thể là ngày trong quá khứ';
      }

      if (dueDate < startDate) {
        newErrors.dueDate = 'Thời hạn hoàn thành phải sau ngày bắt đầu';
      }
    }

    // Kiểm tra thành viên
    if (!formData.assignedToId || formData.assignedToId === 0) {
      newErrors.assignedToId = 'Vui lòng chọn thành viên để giao nhiệm vụ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form data before validation:', formData);
    
    if (validateForm()) {
      console.log('Form is valid, submitting:', formData);
      onSubmit(formData);
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  const handleInputChange = (field: keyof NewTaskData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error khi user bắt đầu nhập
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Set ngày mặc định
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    if (!formData.startDate) {
      setFormData(prev => ({
        ...prev,
        startDate: formatDate(today)
      }));
    }

    if (!formData.dueDate) {
      setFormData(prev => ({
        ...prev,
        dueDate: formatDate(tomorrow)
      }));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
      {/* Tiêu đề nhiệm vụ */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Tên nhiệm vụ <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder=""
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Nội dung nhiệm vụ */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Nội dung nhiệm vụ: <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder=""
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Tài liệu đính kèm */}
      <div className="mb-4">
        <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
          Tải tài liệu: 
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
          <input
            type="file"
            id="attachments"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                const fileNames = Array.from(files).map(file => file.name).join(', ');
                handleInputChange('attachmentUrls', fileNames);
              }
            }}
            className="hidden"
            disabled={isSubmitting}
          />
          <label
            htmlFor="attachments"
            className="cursor-pointer flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm tài liệu
          </label>
          {formData.attachmentUrls && (
            <p className="mt-2 text-sm text-gray-600">{formData.attachmentUrls}</p>
          )}
        </div>
      </div>

      {/* Ngày bắt đầu */}
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
          Ngày bắt đầu: <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="startDate"
          value={formData.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            errors.startDate ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={isSubmitting}
        />
        {errors.startDate && (
          <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
        )}
      </div>

      {/* Thời hạn hoàn thành */}
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
          Thời hạn hoàn thành nhiệm vụ: <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dueDate"
          value={formData.dueDate}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            errors.dueDate ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={isSubmitting}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
        )}
      </div>

      {/* Thành viên nhận nhiệm vụ */}
      <div className="mb-6">
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-2">
          Thành viên nhận nhiệm vụ: <span className="text-red-500">*</span>
        </label>
        <select
          id="assignedTo"
          value={formData.assignedToId}
          onChange={(e) => handleInputChange('assignedToId', parseInt(e.target.value))}
          className={`...`}
          disabled={isSubmitting}
        >
          <option value={0}>Chọn thành viên</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        {errors.assignedToId && (
          <p className="mt-1 text-sm text-red-600">{errors.assignedToId}</p>
        )}
      </div>

      {/* Checkbox milestone */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isMilestone}
            onChange={(e) => handleInputChange('isMilestone', e.target.checked)}
            className="mr-2"
            disabled={isSubmitting}
          />
          <span className="text-sm text-gray-700">Priority: High </span>
        </label>
      </div>

      {/* Nút tạo */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500'
        }`}
      >
        {isSubmitting ? 'Đang tạo...' : 'Tạo'}
      </button>
    </form>
  );
};