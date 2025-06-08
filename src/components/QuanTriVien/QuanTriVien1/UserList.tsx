import React, { useState, useEffect } from "react";
import { RoleActionButton } from "./RoleActionButton";
import { getUsersByRole, addRoleToUser, deleteRoleFromUser, ApiUser } from "../../../services/userService";

interface UserListProps {
  selectedRole: string | null;
}

export const UserList: React.FC<UserListProps> = ({ selectedRole }) => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    console.log("Fetching users for role:", selectedRole);
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await getUsersByRole(selectedRole || 'all');
      setUsers(fetchedUsers);
      console.log("Fetched users:", fetchedUsers);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRole = async (userId: number, roleName: string) => {
    try {
      await addRoleToUser(userId, roleName);
      await fetchUsers(); // Refresh list after role change
      console.log(`Assigned role ${roleName} to user ${userId}`);
    } catch (err) {
      console.error('Error assigning role:', err);
      setError(err as Error);
    }
  };

  const handleRevokeRole = async (userId: number, roleName: string) => {
    try {
      await deleteRoleFromUser(userId, roleName);
      await fetchUsers(); // Refresh list after role change
      console.log(`Revoked role ${roleName} from user ${userId}`);
    } catch (err) {
      console.error('Error revoking role:', err);
      setError(err as Error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedRole]);

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
          Không thể tải danh sách người dùng. Vui lòng thử lại sau.
          {error.message && <p className="text-sm text-gray-600 mt-2">Chi tiết lỗi: {error.message}</p>}
        </div>
      </section>
    );
  }

  if (users.length === 0) {
    return (
      <section className="pt-6 mt-6 w-full max-w-5xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <div className="text-center text-gray-500 p-4">
          Không tìm thấy người dùng nào phù hợp với vai trò được chọn.
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
            {users.map((user) => (
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