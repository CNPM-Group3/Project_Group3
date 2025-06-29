import React, { useState, useEffect } from 'react';
import usersService from '@cnpm/services/usersService';// Import service

// Interface definitions
interface RoleActionButtonProps {
  type: "assign" | "revoke";
  onClick?: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatarURL: string;
  backgroundURL: string;
  socialLinks: string[];
  roles: string[];
  isGoogleUser: boolean;
  createdAt: string;
}

// RoleActionButton Component
const RoleActionButton: React.FC<RoleActionButtonProps> = ({ type, onClick }) => {
  const buttonStyles = {
    assign: "px-4 py-1 text-cyan-800 bg-blue-300 rounded-xl hover:bg-blue-400 transition-colors",
    revoke: "px-7 py-1 text-red-800 bg-rose-400 rounded-xl max-md:px-5 hover:bg-rose-500 transition-colors",
  };

  const buttonText = {
    assign: "Gán vai trò",
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
        const users: User[] = await usersService.getAllUsers();
        
        // Extract unique roles từ tất cả users
        const uniqueRoles = new Set<string>();
        users.forEach(user => {
          user.roles.forEach(role => uniqueRoles.add(role));
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
    <div className="flex flex-wrap gap-2 px-6 py-2.5 w-full text-base rounded-lg border border-solid border-slate-200 max-md:pr-5 max-md:max-w-full">
      <span className="grow my-auto text-slate-600">
        Lọc theo vai trò {loading && "(Đang tải...)"}
      </span>
      <div className="flex flex-wrap flex-auto font-medium text-black max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab69d73d717cbc6050076b3bf3e3e159135cde2?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
          className="object-contain shrink-0 my-auto aspect-[1.12] w-[19px]"
          alt="Filter"
        />
        <div className="flex flex-wrap flex-auto gap-7 justify-center items-center">
          {(availableRoles.length > 0 ? availableRoles : defaultRoles).map((role, index) => (
            <button
              key={index}
              onClick={() => handleRoleSelect(role)}
              className={`self-stretch my-auto transition-colors px-2 py-1 rounded ${
                selectedRole === role
                  ? 'text-blue-600 bg-blue-100 font-semibold'
                  : 'hover:text-blue-600 hover:bg-gray-100'
              }`}
              disabled={loading}
            >
              {role}
            </button>
          ))}
        </div>
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
        const users: User[] = await usersService.getAllUsers();
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

  // Handle role assignment
  const handleAssignRole = async (userId: string, roleName: string) => {
    try {
      await usersService.addRoleToUser(userId, roleName);
      // Refresh user list
      const updatedUsers = await usersService.getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error assigning role:', error);
      alert('Không thể gán vai trò');
    }
  };

  // Handle role revocation
  const handleRevokeRole = async (userId: string, roleName: string) => {
    try {
      await usersService.deleteRoleFromUser(userId, roleName);
      // Refresh user list
      const updatedUsers = await usersService.getAllUsers();
      setUsers(updatedUsers);
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
            <tr className="text-left text-sm text-gray-500 bg-gray-50">
              <th className="px-6 py-3">Họ tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Vai trò</th>
              <th className="px-6 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Không có người dùng nào
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {user.avatarURL && (
                      <img 
                        src={user.avatarURL} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span className="font-medium">{user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map(role => (
                        <span 
                          key={role}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
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
                            const role = prompt(`Chọn vai trò muốn thu hồi: ${user.roles.join(', ')}`);
                            if (role && user.roles.includes(role)) {
                              handleRevokeRole(user.id, role);
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