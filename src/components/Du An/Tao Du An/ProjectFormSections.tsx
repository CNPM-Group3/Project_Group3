"use client";
import React, { useState } from "react";

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

const RESEARCH_TOPICS = [
  { id: 1, title: "AI in Healthcare" },
  { id: 2, title: "Climate Change Research" },
  { id: 3, title: "Space Exploration" },
];

export const ProjectTypeSection: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Chủ đề nghiên cứu *
      </label>
      <select
        className="w-full px-4 py-2 border rounded-lg"
        value={formData.researchTopicId}
        onChange={(e) =>
          setFormData({ ...formData, researchTopicId: parseInt(e.target.value) })
        }
        required
      >
        <option value="">-- Chọn chủ đề --</option>
        {RESEARCH_TOPICS.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export const UserInfoSection = () => {
  return (
    <section className="px-6 py-5 mt-3 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:max-w-full">
      <h2 className="text-xl font-bold leading-5 text-gray-700">
        Thông tin người đăng ký
      </h2>
      <div className="mt-4 px-4 py-3 text-xs leading-loose text-green-800 bg-green-100 rounded-lg text-center max-w-[1000px] mx-auto">
        Bạn sẽ được tự động đặt làm chủ dự án khi tạo dự án thành công
      </div>
    </section>
  );
};

export const ProjectDetailsSection: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <section className="px-6 py-5 mt-3 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5">
      <h2 className="text-xl font-bold leading-5 text-gray-700 mb-4">
        Thông tin dự án
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên dự án *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, title: e.target.value }))}
            placeholder="Nhập tên dự án"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả dự án *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
            placeholder="Mô tả chi tiết về dự án"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mục tiêu *
          </label>
          <textarea
            value={formData.objectives}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, objectives: e.target.value }))}
            placeholder="Mục tiêu cần đạt được"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kết quả mong đợi *
          </label>
          <textarea
            value={formData.expectedOutcomes}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, expectedOutcomes: e.target.value }))}
            placeholder="Kết quả dự kiến sau khi hoàn thành"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày bắt đầu *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày kết thúc *
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const TeamMembersSection: React.FC<Props> = ({ formData, setFormData }) => {
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "member"
  });

  const addMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) {
      alert("Vui lòng nhập đầy đủ tên và email thành viên");
      return;
    }

    const member: Member = {
      id: Date.now().toString(),
      name: newMember.name.trim(),
      email: newMember.email.trim(),
      role: newMember.role
    };

    setFormData((prev: any) => ({
      ...prev,
      members: [...(prev.members || []), member]
    }));

    setNewMember({ name: "", email: "", role: "member" });
  };

  const removeMember = (id: string) => {
    setFormData((prev: any) => ({
      ...prev,
      members: (prev.members || []).filter((member: Member) => member.id !== id)
    }));
  };

  return (
    <section className="px-6 py-5 mt-3 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5">
      <h2 className="text-xl font-bold leading-5 text-gray-700 mb-4">
        Thành viên dự án
      </h2>
      
      {/* <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Lưu ý:</strong> Thành viên sẽ được thêm vào dự án sau khi tạo dự án thành công. 
          Hiện tại chỉ lưu thông tin để tham khảo.
        </p>
      </div> */}

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Thêm thành viên</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Tên thành viên"
            value={newMember.name}
            onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={newMember.role}
            onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="member">Thành viên</option>
            <option value="leader">Trưởng nhóm</option>
            <option value="researcher">Nghiên cứu viên</option>
          </select>
          <button
            type="button"
            onClick={addMember}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Thêm
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Danh sách thành viên ({(formData.members || []).length})
        </h3>
        
        {(!formData.members || formData.members.length === 0) ? (
          <div className="text-center py-8 text-gray-500">
            <p>Chưa có thành viên nào được thêm</p>
            <p className="text-sm">Thêm thành viên để cùng thực hiện dự án</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.members.map((member: Member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.email}</div>
                  <div className="text-xs text-teal-600 font-medium">{member.role}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
