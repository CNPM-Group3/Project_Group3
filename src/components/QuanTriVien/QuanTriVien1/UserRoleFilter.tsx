import React, { useState, useEffect } from 'react';
import usersService from '@cnpm/services/usersService';// Import service
import { updateUserRoles  } from '@cnpm/services/userService'; // Import update user roles function

// Interface definitions
interface RoleActionButtonProps {
  type: "assign" | "revoke";
  onClick?: () => void;
}

// Updated User interface to handle multiple roles
interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  address?: string;
  roles: string[]; // Changed back to array to handle multiple roles
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
  roles: apiUser.roles || [apiUser.role], // Handle both single role and multiple roles
  status: apiUser.status,
  createdAt: apiUser.createdAt,
});

// RoleActionButton Component
const RoleActionButton: React.FC<RoleActionButtonProps> = ({ type, onClick }) => {
  const buttonStyles = {
    assign: "px-4 py-1 text-cyan-800 bg-blue-300 rounded-xl hover:bg-blue-400 transition-colors",
    revoke: "px-7 py-1 text-red-800 bg-rose-400 rounded-xl max-md:px-5 hover:bg-rose-500 transition-colors",
  };

  const buttonText = {
    assign: "Sửa vai trò",
    revoke: "Thu hồi",
  };

  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium leading-none ${buttonStyles[type]}`}
    >
      {buttonText[type]}
    </button>
  );
};

// UserRoleFilter Component với API integration
const UserRoleFilter: React.FC<{ onRoleChange: (role: string) => void }> = ({ onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState<string>("Tất cả");
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Danh sách vai trò cố định - có thể mở rộng từ API
  const defaultRoles = [
    "Tất cả",
    "Sinh viên", 
    "Giảng viên",
    "Nhân viên",
    "Quản trị viên",
  ];

  // Effect để lấy danh sách vai trò từ API (tùy chọn)
  useEffect(() => {
    const fetchAvailableRoles = async () => {
      try {
        setLoading(true);
        // Lấy tất cả users để extract unique roles
        const apiUsers = await usersService.getAllUsers();
        const users = apiUsers.map(mapApiUserToUser);
        
        // Extract unique roles từ tất cả users
        const uniqueRoles = new Set<string>();
        users.forEach(user => {
          user.roles.forEach(role => {
            if (role) uniqueRoles.add(role);
          });
        });
        
        // Combine với default roles và loại bỏ duplicates
        const allRoles = ["Tất cả", ...Array.from(uniqueRoles)];
        setAvailableRoles(allRoles);
        
      } catch (error) {
        console.error('Error fetching roles:', error);
        // Fallback to default roles nếu API fail
        setAvailableRoles(defaultRoles);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRoles();
  }, []);

  // Handle role selection
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    onRoleChange(role); // Callback để parent component biết role đã thay đổi
  };

  return (
    <div className="mx-auto w-full px-5 py-3 rounded-2xl border bg-white shadow flex flex-col items-center">
      <div className="flex items-center justify-center gap-1 mb-2">
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.586a2 2 0 00-.293-1.121L2.293 6.707A1 1 0 012 6V4z" />
        </svg>
        <span className="text-slate-600 font-semibold text-lg">Lọc theo vai trò {loading && <span className="text-blue-400">(Đang tải...)</span>}</span>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 w-full">
        {(availableRoles.length > 0 ? availableRoles : defaultRoles).map((role, index) => (
          <button
            key={index}
            onClick={() => handleRoleSelect(role)}
            className={`px-2 py-1 rounded-full text-base font-semibold border transition
              ${selectedRole === role
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-blue-400 shadow'
                : 'bg-white text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600'}
            `}
            disabled={loading}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

// UserList Component với API integration
const UserList: React.FC<{ selectedRole: string }> = ({ selectedRole }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch users từ API
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

  // Filter users based on selected role
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

  // Handle role assignment - REPLACE instead of ADD
  const handleAssignRole = async (userId: number, newRole: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) {
        alert('Không tìm thấy người dùng');
        return;
      }

      // Check if user already has this role
      if (user.roles.includes(newRole)) {
        alert('Người dùng đã có vai trò này');
        return;
      }

      // REPLACE the current roles with the new role (not append)
      // If you want to keep existing roles, use: [...user.roles, newRole]
      // If you want to replace with single role, use: [newRole]
      const shouldReplaceRole = confirm(`Bạn muốn thay thế vai trò hiện tại bằng "${newRole}"?\n\nChọn OK để thay thế, Cancel để thêm vai trò mới.`);
      
      let updatedRoles: string[];
      if (shouldReplaceRole) {
        updatedRoles = [newRole]; // Replace with single role
      } else {
        updatedRoles = [...user.roles, newRole]; // Add to existing roles
      }

      // Use updateUserRoles API
      await updateUserRoles(userId, updatedRoles);
      
      // Refresh user list
      const apiUsers = await usersService.getAllUsers();
      const updatedUsers = apiUsers.map(mapApiUserToUser);
      setUsers(updatedUsers);
      
      alert('Cập nhật vai trò thành công');
    } catch (error) {
      console.error('Error assigning role:', error);
      alert('Không thể gán vai trò');
    }
  };

  // Handle role revocation
  const handleRevokeRole = async (userId: number, roleToRemove: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) {
        alert('Không tìm thấy người dùng');
        return;
      }

      // Check if user has this role
      if (!user.roles.includes(roleToRemove)) {
        alert('Người dùng không có vai trò này');
        return;
      }

      // Remove the specific role
      const updatedRoles = user.roles.filter(role => role !== roleToRemove);
      
      // If no roles left, set default role
      if (updatedRoles.length === 0) {
        updatedRoles.push('USER');
      }

      // Use updateUserRoles API
      await updateUserRoles(userId, updatedRoles);
      
      // Refresh user list
      const apiUsers = await usersService.getAllUsers();
      const updatedUsers = apiUsers.map(mapApiUserToUser);
      setUsers(updatedUsers);
      
      alert('Thu hồi vai trò thành công');
    } catch (error) {
      console.error('Error revoking role:', error);
      alert('Không thể thu hồi vai trò');
    }
  };

  if (loading) {
    return (
      <section className="pt-6 mt-6 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Đang tải danh sách người dùng...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-6 mt-6 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-6 mt-6 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white">
      <h2 className="text-lg font-semibold px-6 pb-4">
        Danh sách ({filteredUsers.length} người dùng)
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-t border-gray-200">
          <thead>
            <tr className="text-left text-base text-gray-500 bg-gray-50">
              <th className="px-8 py-5">Họ tên</th>
              <th className="px-8 py-5">Email</th>
              <th className="px-8 py-5">Vai trò</th>
              <th className="px-8 py-5">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-base text-gray-800">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-10 text-center text-gray-500">
                  Không có người dùng nào
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 h-16">
                  <td className="px-8 py-5 flex items-center gap-4">
                    {user.avatar && (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span className="font-medium">{user.name}</span>
                  </td>
                  <td className="px-8 py-5 text-gray-600">{user.email}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((role, index) => (
                        <span 
                          key={`${role}-${index}`}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex gap-3">
                      <RoleActionButton 
                        type="assign"
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
                          onClick={() => {
                            if (user.roles.length === 1) {
                              // Only one role, confirm direct revocation
                              const confirmRevoke = confirm(`Bạn có chắc muốn thu hồi vai trò "${user.roles[0]}" của ${user.name}?`);
                              if (confirmRevoke) {
                                handleRevokeRole(user.id, user.roles[0]);
                              }
                            } else {
                              // Multiple roles, let user choose
                              const role = prompt(`Chọn vai trò muốn thu hồi:\n${user.roles.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nNhập tên vai trò:`);
                              if (role && user.roles.includes(role)) {
                                handleRevokeRole(user.id, role);
                              }
                            }
                          }}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// Main component
const UserManagement = () => {
  const [selectedRole, setSelectedRole] = useState<string>("Tất cả");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="space-y-4">
      <UserRoleFilter onRoleChange={handleRoleChange} />
      <UserList selectedRole={selectedRole} />
    </div>
  );
};

export default UserManagement;
export { UserList, UserRoleFilter, RoleActionButton };