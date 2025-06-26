import React, { useState, useEffect } from "react";
import { authService, UserProfile } from "../../services/authService";
import usersService from "../../services/usersService";

export const UserDetails = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
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

        // Luôn gọi API để lấy thông tin mới nhất
        const response = await authService.getProfile();
        const profile = response.data;

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
    const socialLinksArray = e.target.value.split(",").map(link => link.trim());
    setUserInfo((prev) => ({ ...prev, socialLinks: socialLinksArray.join(", ") }));
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

      const updatePayload = {
        name: userInfo.name,
        avatarUrl: userProfile.avatarUrl || "",
        backgroundUrl: userProfile.backgroundUrl || "",
        socialLinks: userInfo.socialLinks.split(",").map(link => link.trim()).join(","),
      };

      const response = await authService.updateUserProfile(updatePayload);

      // Kiểm tra nếu có lỗi trong response từ API
      if (response.status !== 200) {
        throw new Error("Không thể cập nhật thông tin");
      }

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

  const togglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
    if (!isChangingPassword) {
      // Reset form khi bắt đầu đổi mật khẩu
      setPasswords({
        current: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-6 animate-pulse">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="flex justify-center items-center h-40">
            <div className="text-gray-500 flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Đang tải thông tin...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-red-200 shadow-sm p-8">
        <div className="flex justify-center items-center h-40">
          <div className="text-red-500 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-500">Không tìm thấy thông tin người dùng</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Phần thông tin người dùng */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-teal-50 px-8 py-6 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Chi tiết người dùng
              </h2>
              <p className="text-gray-600 mt-1">Quản lý thông tin cá nhân của bạn</p>
            </div>
            <button
              onClick={toggleEdit}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isEditing 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isEditing ? "Hủy" : "Chỉnh sửa"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className={`${isEditing ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : ''}`}>
            {/* Thông tin hiển thị */}
            <div className={`${isEditing ? '' : 'max-w-2xl'}`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Thông tin cá nhân
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">ID:</span>
                  <span className="text-gray-800 font-mono">{userProfile.id || "N/A"}</span>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">Tên:</span>
                  <span className="text-gray-800 font-medium">{userProfile.name || "N/A"}</span>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">Email:</span>
                  <span className="text-gray-800">{userProfile.email}</span>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">Vai trò:</span>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.roles?.map((role, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {role}
                      </span>
                    )) || <span className="text-gray-500">N/A</span>}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">Mạng xã hội:</span>
                  <span className="text-gray-800">
                    {userProfile.socialLinks?.length 
                      ? userProfile.socialLinks.join(", ") 
                      : "Chưa có"}
                  </span>
                </div>
              </div>
            </div>

            {/* Form chỉnh sửa */}
            {isEditing && (
              <div className="lg:border-l lg:border-gray-200 lg:pl-8">
                <form onSubmit={handleUserInfoSubmit} className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Cập nhật thông tin
                  </h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên đầy đủ
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleUserInfoChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Nhập tên đầy đủ"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mạng xã hội
                      </label>
                      <input
                        type="text"
                        name="socialLinks"
                        value={userInfo.socialLinks}
                        onChange={handleSocialLinksChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="facebook.com/yourname, twitter.com/yourname"
                      />
                      <p className="text-xs text-gray-500 mt-1">Cách nhau bằng dấu phẩy</p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Đang cập nhật...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Cập nhật thông tin
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phần đổi mật khẩu */}
      {!userProfile.isGoogleUser && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 px-8 py-6 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Bảo mật tài khoản
                </h3>
                <p className="text-gray-600 mt-1">Thay đổi mật khẩu để bảo vệ tài khoản</p>
              </div>
              <button
                onClick={togglePasswordChange}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isChangingPassword 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isChangingPassword ? "Hủy" : "Đổi mật khẩu"}
              </button>
            </div>
          </div>

          {/* Form đổi mật khẩu */}
          {isChangingPassword && (
            <div className="p-8">
              <form onSubmit={handlePasswordSubmit} className="max-w-md mx-auto">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      name="current"
                      value={passwords.current}
                      onChange={handlePasswordsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Nhập mật khẩu hiện tại"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Nhập mật khẩu mới"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={passwords.confirmNewPassword}
                      onChange={handlePasswordsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Nhập lại mật khẩu mới"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};