import React, { useState, useEffect } from "react";
import { authService, UserProfile } from "../../services/authService";
import usersService from "../../services/usersService";

export const UserDetails = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State cho form cập nhật thông tin
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    socialLinks: "",
  });

  // State cho form đổi mật khẩu
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Fetch user profile khi component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Thử lấy từ authService trước
        let profile = authService.getCurrentProfile();
        
        if (!profile) {
          // Nếu không có trong state, gọi API
          const response = await authService.getProfile();
          profile = response.data;
        }

        if (profile) {
          setUserProfile(profile);
          setUserInfo({
            name: profile.name || "",
            email: profile.email || "",
            socialLinks: profile.socialLinks?.join(", ") || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSocialLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, socialLinks: e.target.value }));
  };

  const handlePasswordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userProfile) return;

    try {
      setLoading(true);
      setError(null);

      // Tạo payload để update
      const updatePayload = {
        name: userInfo.name,
        avatarUrl: userProfile.avatarUrl || "",
        backgroundUrl: userProfile.backgroundUrl || "",
        socialLinks: userProfile.socialLinks?.join(",") || "",
      };

      // Gọi API cập nhật thông qua authService
      await authService.updateUserProfile(updatePayload);

      // Refresh profile data
      await authService.fetchAndStoreUserProfile();
      const updatedProfile = authService.getCurrentProfile();
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
      }

      setIsEditing(false);
      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Error updating user info:", err);
      setError("Không thể cập nhật thông tin");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    // TODO: Implement password change API call
    console.log("Đổi mật khẩu:", passwords);
    alert("Chức năng đổi mật khẩu sẽ được triển khai sau");
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("vi-VN");
    } catch {
      return "N/A";
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && userProfile) {
      // Reset form khi bắt đầu edit
      setUserInfo({
        name: userProfile.name || "",
        email: userProfile.email || "",
        socialLinks: userProfile.socialLinks?.join(", ") || "",
      });
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col grow px-14 py-11 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-500">Đang tải thông tin...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col grow px-14 py-11 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-center items-center h-40">
          <div className="text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (!userProfile) {
    return (
      <section className="flex flex-col grow px-14 py-11 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-500">Không tìm thấy thông tin người dùng</div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col grow px-14 py-11 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-center text-gray-700">
          Chi tiết người dùng
        </h2>
        <button
          onClick={toggleEdit}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isEditing ? "Hủy" : "Chỉnh sửa"}
        </button>
      </div>

      <div className="mt-7 text-sm text-gray-700">
        <p className="mt-2">
          <strong className="text-gray-700">ID:</strong>
          <span className="text-gray-700"> {userProfile.id || "N/A"}</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Tên:</strong>
          <span className="text-gray-700"> {userProfile.name || "N/A"}</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Email:</strong>
          <span className="text-gray-700"> {userProfile.email}</span>
        </p>

        <p className="mt-2">
          <strong className="text-gray-700">Vai trò:</strong>
          <span className="text-gray-700"> {userProfile.roles?.join(", ") || "N/A"}</span>
        </p>
        <p className="mt-2">
          <strong className="text-gray-700">Mạng xã hội:</strong>
          <span className="text-gray-700">
            {userProfile.socialLinks?.length 
              ? userProfile.socialLinks.join(", ") 
              : " Chưa có"}
          </span>
        </p>
      </div>

      {/* Form thay đổi thông tin */}
      {isEditing && (
        <form
          onSubmit={handleUserInfoSubmit}
          className="mt-10 border-t border-gray-300 pt-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Thay đổi thông tin
          </h3>
          <div className="flex flex-col gap-4 max-w-md">
            <label className="flex flex-col text-gray-700">
              Tên
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                className="mt-1 rounded border border-gray-300 p-2"
                required
              />
            </label>
            
            <label className="flex flex-col text-gray-700">
              Email
              <input
                type="email"
                name="email"
                value={userInfo.email}
                className="mt-1 rounded border border-gray-300 p-2 bg-gray-100"
                disabled
              />
            </label>
            
            <label className="flex flex-col text-gray-700">
              Mạng xã hội 
              <input
                type="text"
                name="socialLinks"
                value={userInfo.socialLinks}
                onChange={handleSocialLinksChange}
                className="mt-1 rounded border border-gray-300 p-2"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </button>
          </div>
        </form>
      )}

      {/* Form đổi mật khẩu */}
      {!userProfile.isGoogleUser && (
        <form
          onSubmit={handlePasswordSubmit}
          className="mt-10 border-t border-gray-300 pt-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Đổi mật khẩu
          </h3>
          <div className="flex flex-col gap-4 max-w-md">
            <label className="flex flex-col text-gray-700">
              Mật khẩu hiện tại
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordsChange}
                className="mt-1 rounded border border-gray-300 p-2"
                required
              />
            </label>
            
            <label className="flex flex-col text-gray-700">
              Mật khẩu mới
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordsChange}
                className="mt-1 rounded border border-gray-300 p-2"
                required
              />
            </label>
            
            <label className="flex flex-col text-gray-700">
              Xác nhận mật khẩu mới
              <input
                type="password"
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
                onChange={handlePasswordsChange}
                className="mt-1 rounded border border-gray-300 p-2"
                required
              />
            </label>
            
            <button
              type="submit"
              className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      )}
    </section>
  );
};