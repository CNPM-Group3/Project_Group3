import React, { useState, useEffect } from 'react';
import usersService from '@cnpm/services/usersService';
import { updateUserRoles } from '@cnpm/services/userService';

// Interface definitions
interface RoleActionButtonProps {
  type: "assign" | "revoke";
  onClick?: () => void;
  disabled?: boolean;
}

interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  address?: string;
  roles: string[];
  status: string;
  createdAt?: string;
}

// Helper function to convert API user to display format
const mapApiUserToUser = (apiUser: any): User => ({
  id: apiUser.id,
  email: apiUser.email,
  name: apiUser.name,
  avatar: apiUser.avatar,
  address: apiUser.address,
  roles: apiUser.roles || [apiUser.role],
  status: apiUser.status,
  createdAt: apiUser.createdAt,
});

// Enhanced RoleActionButton Component
const RoleActionButton: React.FC<RoleActionButtonProps> = ({ type, onClick, disabled = false }) => {
  const buttonStyles = {
    assign: `
      px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 
      rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 
      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    `,
    revoke: `
      px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 
      rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transform hover:scale-105 
      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
    `,
  };

  const buttonText = {
    assign: "Gán vai trò",
    revoke: "Thu hồi",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed transform-none hover:scale-100";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonStyles[type]} ${disabled ? disabledStyles : ''}`}
    >
      {buttonText[type]}
    </button>
  );
};

// Enhanced UserRoleFilter Component
const UserRoleFilter: React.FC<{ onRoleChange: (role: string) => void }> = ({ onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState<string>("Tất cả");
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const defaultRoles = [
    "Tất cả",
    "Sinh viên", 
    "Giảng viên",
    "Nhân viên",
    "Quản trị viên",
  ];

  useEffect(() => {
    const fetchAvailableRoles = async () => {
      try {
        setLoading(true);
        const apiUsers = await usersService.getAllUsers();
        const users = apiUsers.map(mapApiUserToUser);
        
        const uniqueRoles = new Set<string>();
        users.forEach(user => {
          user.roles.forEach(role => {
            if (role) uniqueRoles.add(role);
          });
        });
        
        const allRoles = ["Tất cả", ...Array.from(uniqueRoles)];
        setAvailableRoles(allRoles);
        
      } catch (error) {
        console.error('Error fetching roles:', error);
        setAvailableRoles(defaultRoles);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRoles();
  }, []);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    onRoleChange(role);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="p-2 bg-blue-100 rounded-full">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.586a2 2 0 00-.293-1.121L2.293 6.707A1 1 0 012 6V4z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Lọc theo vai trò 
          {loading && <span className="text-blue-500 text-sm ml-2">(Đang tải...)</span>}
        </h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {(availableRoles.length > 0 ? availableRoles : defaultRoles).map((role, index) => (
          <button
            key={index}
            onClick={() => handleRoleSelect(role)}
            disabled={loading}
            className={`
              px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300
              transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${selectedRole === role
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg focus:ring-blue-500'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 focus:ring-gray-300'}
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

// Enhanced UserList Component
const UserList: React.FC<{ selectedRole: string }> = ({ selectedRole }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUsers = await usersService.getAllUsers();
        const users = apiUsers.map(mapApiUserToUser);
        setUsers(users);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Không thể tải danh sách người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedRole === "Tất cả") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.roles.includes(selectedRole)
      );
      setFilteredUsers(filtered);
    }
  }, [users, selectedRole]);

  const handleAssignRole = async (userId: number, newRole: string) => {
    try {
      setActionLoading(userId);
      const user = users.find(u => u.id === userId);
      if (!user) {
        alert('Không tìm thấy người dùng');
        return;
      }

      if (user.roles.includes(newRole)) {
        alert('Người dùng đã có vai trò này');
        return;
      }

      const shouldReplaceRole = confirm(`Bạn muốn thay thế vai trò hiện tại bằng "${newRole}"?\n\nChọn OK để thay thế, Cancel để thêm vai trò mới.`);
      
      let updatedRoles: string[];
      if (shouldReplaceRole) {
        updatedRoles = [newRole];
      } else {
        updatedRoles = [...user.roles, newRole];
      }

      await updateUserRoles(userId, updatedRoles);
      
      const apiUsers = await usersService.getAllUsers();
      const updatedUsers = apiUsers.map(mapApiUserToUser);
      setUsers(updatedUsers);
      
      alert('Cập nhật vai trò thành công');
    } catch (error) {
      console.error('Error assigning role:', error);
      alert('Không thể gán vai trò');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevokeRole = async (userId: number, roleToRemove: string) => {
    try {
      setActionLoading(userId);
      const user = users.find(u => u.id === userId);
      if (!user) {
        alert('Không tìm thấy người dùng');
        return;
      }

      if (!user.roles.includes(roleToRemove)) {
        alert('Người dùng không có vai trò này');
        return;
      }

      const updatedRoles = user.roles.filter(role => role !== roleToRemove);
      
      if (updatedRoles.length === 0) {
        updatedRoles.push('USER');
      }

      await updateUserRoles(userId, updatedRoles);
      
      const apiUsers = await usersService.getAllUsers();
      const updatedUsers = apiUsers.map(mapApiUserToUser);
      setUsers(updatedUsers);
      
      alert('Thu hồi vai trò thành công');
    } catch (error) {
      console.error('Error revoking role:', error);
      alert('Không thể thu hồi vai trò');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div className="text-gray-600 font-medium">Đang tải danh sách người dùng...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="p-3 bg-red-100 rounded-full">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-red-600 font-medium text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Danh sách người dùng
          </h2>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {filteredUsers.length} người dùng
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Thông tin
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-500 font-medium">Không có người dùng nào</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">
                      Trạng thái: <span className="capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((role, index) => (
                        <span 
                          key={`${role}-${index}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <RoleActionButton 
                        type="assign"
                        disabled={actionLoading === user.id}
                        onClick={() => {
                          const role = prompt('Nhập tên vai trò muốn gán:');
                          if (role) {
                            handleAssignRole(user.id, role);
                          }
                        }}
                      />
                      {user.roles.length > 0 && (
                        <RoleActionButton 
                          type="revoke"
                          disabled={actionLoading === user.id}
                          onClick={() => {
                            if (user.roles.length === 1) {
                              const confirmRevoke = confirm(`Bạn có chắc muốn thu hồi vai trò "${user.roles[0]}" của ${user.name}?`);
                              if (confirmRevoke) {
                                handleRevokeRole(user.id, user.roles[0]);
                              }
                            } else {
                              const role = prompt(`Chọn vai trò muốn thu hồi:\n${user.roles.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nNhập tên vai trò:`);
                              if (role && user.roles.includes(role)) {
                                handleRevokeRole(user.id, role);
                              }
                            }
                          }}
                        />
                      )}
                      {actionLoading === user.id && (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Enhanced Main component
const UserManagement = () => {
  const [selectedRole, setSelectedRole] = useState<string>("Tất cả");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Quản lý người dùng
          </h1>
          <p className="text-gray-600 text-lg">
            Gán và quản lý vai trò cho người dùng trong hệ thống
          </p>
        </div>
        
        <UserRoleFilter onRoleChange={handleRoleChange} />
        <UserList selectedRole={selectedRole} />
      </div>
    </div>
  );
};

export default UserManagement;
export { UserList, UserRoleFilter, RoleActionButton };