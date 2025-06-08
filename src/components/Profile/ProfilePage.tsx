import React, { useState, useEffect } from 'react';
import { updateUserProfile, User, ApiUser } from '../../services/userService';
// getCurrentUser is no longer needed here as fetching is done in the parent
// import { getCurrentUser } from '../../services/userService';

// Define props for ProfilePage
interface ProfilePageProps {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// ProfilePage component now receives props from the parent (e.g., Profile.tsx)
export const ProfilePage: React.FC<ProfilePageProps> = ({ user, loading, error }) => {
  // Initial fetch states are now received via props
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  
  // Keep update-related states and logic within ProfilePage
  const [updateLoading, setUpdateLoading] = useState(false); // State for update loading
  const [updateError, setUpdateError] = useState<string | null>(null); // State for update error
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null); // State for update success

  // Local state for form input values in the User Details section
  // Initialize form data when user prop changes
  const [formData, setFormData] = React.useState<Partial<User>>({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    // Include other fields if needed and available in User interface and API
  });

  // Effect to update form data when user prop changes (after initial fetch or successful update)
  React.useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      address: user?.address || '',
      // Update other fields if necessary
    });
  }, [user]); // Dependency on user prop

  // Remove initial fetch useEffect
  // useEffect(() => { ... }, []);

  // Handle input changes in the User Details form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<User>) => ({ ...prev, [name]: value }));
    // Clear messages on change
    setUpdateSuccess(null);
    setUpdateError(null);
  };

  // Handle updating user profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
       e.preventDefault(); // Prevent default form submission
       setUpdateLoading(true); // Show loading for update action
       setUpdateError(null);
       setUpdateSuccess(null);

       try {
          // API updateUserProfile chỉ nhận name (fullName), email, address
          const updatePayload: Partial<User> = {
              name: formData.name,
              email: formData.email,
              address: formData.address,
              // Include other editable fields
          };

          // Optional: basic validation before calling parent update function
          if (!updatePayload.name || !updatePayload.email) {
              alert("Tên và Email là bắt buộc.");
              setUpdateLoading(false);
              return;
          }

          // Loại bỏ các trường undefined để API chỉ cập nhật các trường có giá trị
          Object.keys(updatePayload).forEach(key => {
            const typedKey = key as keyof Partial<User>;
            if (updatePayload[typedKey] === undefined) {
              delete updatePayload[typedKey];
            }
          });

          const updatedApiUser: ApiUser = await updateUserProfile(updatePayload);

          // Update local user state in the parent (this component does not manage user state anymore)
          // We might need to pass a callback up if the parent needs to react to the update success
          // For now, we assume the parent doesn't need immediate user data update, and the next fetch will get latest data.
          // If parent needs immediate update, consider adding onUpdateSuccess prop here
          
          // Since ProfilePage now *receives* user data, updating the user state here won't reflect in the parent.
          // The parent (Profile.tsx) is responsible for updating the user state after a successful update.
          // We can add an onUpdateSuccess prop to notify the parent.

          setUpdateSuccess("Cập nhật thông tin thành công!");

       } catch (err) {
          console.error("Failed to update user info:", err);
          setUpdateError("Đã xảy ra lỗi khi cập nhật thông tin.");
       } finally {
          setUpdateLoading(false);
       }
  };

  // ProfilePage now relies on parent's loading/error state for initial display
  if (loading) {
       return <div className="text-center text-gray-500">Đang tải thông tin hồ sơ...</div>; // Or return null, depending on desired behavior
  }

  if (error) {
       return <div className="text-center text-red-500">{error}</div>;
  }

  // If no user data after loading (parent fetched null), display a message
  if (!user) {
      return <div className="text-center text-gray-500">Không tìm thấy thông tin người dùng.</div>;
  }

  // Render the combined sections once user data is loaded (passed via props)
  return (
    <div className="profile-page-sections-container flex gap-10 max-md:flex-col"> {/* Add appropriate container and layout classes */}
      {/* Section: Chi tiết người dùng */}
          <section className="flex flex-col grow px-14 py-11 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <h2 className="self-center text-xl font-bold text-center text-gray-700">
                  Chi tiết người dùng
              </h2>

              {/* Hiển thị thông tin user từ props */}
              <div className="mt-7 text-sm text-gray-700">
                  <p className="mt-2">
                      <strong className="text-gray-700">Tên:</strong>
                      <span className="text-gray-700"> {user?.name || 'N/A'}</span>
                  </p>

                  {/* Các trường class, Mã Thành Viên, Ngày sinh, Số Điện Thoại không có trong API User, chỉ hiển thị nếu có dữ liệu mẫu hoặc fetch từ nguồn khác */}
                  <p className="mt-2">
                      <strong className="text-gray-700">Lớp:</strong>
                      <span className="text-gray-700"> {"CNTTCLC23" /* Dữ liệu mẫu hoặc từ nguồn khác */}</span>
                  </p>

                  <p className="mt-2">
                      <strong className="text-gray-700">Mã Thành Viên:</strong>
                      <span className="text-gray-700"> {"079********231" /* Dữ liệu mẫu hoặc từ nguồn khác */}</span>
                  </p>

                  <p className="mt-2">
                      <strong className="text-gray-700">Ngày sinh:</strong>
                      <span className="text-gray-700"> {"24/07/2004" /* Dữ liệu mẫu hoặc từ nguồn khác */}</span>
                  </p>

                  <p className="mt-2">
                      <strong className="text-gray-700">Email:</strong>
                      <span className="text-gray-700"> {user?.email || 'N/A'}</span>
                  </p>

                  <p className="mt-2">
                      <strong className="text-gray-700">Số Điện Thoại:</strong>
                      <span className="text-gray-700"> {"08********" /* Dữ liệu mẫu hoặc từ nguồn khác */}</span>
                  </p>

                  <p className="mt-2">
                      <strong className="text-gray-700">Mạng xã hội:</strong>
                  </p>
              </div>

              {/* Form thay đổi thông tin */}
              {/* Use local state for form inputs */} 
              <form
                  onSubmit={handleUpdateProfile}
                  className="mt-10 border-t border-gray-300 pt-6"
              >
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                      Thay đổi thông tin
                  </h3>
                  <div className="flex flex-col gap-4 max-w-md">
                     {/* Hiển thị thông báo lỗi hoặc thành công từ state nội bộ */}
                    {updateError && <div className="text-red-500 mb-4">{updateError}</div>}
                    {updateSuccess && <div className="text-green-500 mb-4">{updateSuccess}</div>}

                      <label className="flex flex-col text-gray-700">
                          Tên
                          <input
                              type="text"
                              name="name"
                              value={formData.name || ''}
                              onChange={handleInputChange}
                              className="mt-1 rounded border border-gray-300 p-2"
                              required
                              disabled={updateLoading}
                          />
                      </label>
                      {/* Các trường không có trong API updateUserProfile sẽ giữ nguyên dữ liệu mẫu hoặc bị vô hiệu hóa */}
                      <label className="flex flex-col text-gray-700">
                          Lớp
                          <input
                              type="text"
                              name="class"
                              value={"CNTTCLC23"}
                              className="mt-1 rounded border border-gray-300 p-2"
                              disabled // Tắt input vì không có API cập nhật
                          />
                      </label>
                      <label className="flex flex-col text-gray-700">
                          Email
                          <input
                              type="email"
                              name="email"
                              value={formData.email || ''}
                              onChange={handleInputChange}
                              className="mt-1 rounded border border-gray-300 p-2"
                              required
                              disabled={updateLoading}
                          />
                      </label>
                      <label className="flex flex-col text-gray-700">
                          Số Điện Thoại
                          <input
                              type="tel"
                              name="phone"
                              value={"08********"}
                              className="mt-1 rounded border border-gray-300 p-2"
                              disabled // Tắt input vì không có API cập nhật
                          />
                      </label>
                      <button
                          type="submit"
                          className={`py-2 rounded transition ${updateLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                          disabled={updateLoading}
                      >
                          {updateLoading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                      </button>
                  </div>
              </form>
          </section>

      {/* Section: Thông tin nghiên cứu */}
         <section className="flex flex-col grow px-14 py-16 text-gray-700 rounded-xl border border-solid border-slate-200 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <h2 className="self-center text-xl font-bold text-center">
                  Thông tin nghiên cứu
              </h2>

              {/* Hiển thị thông tin user từ props */}
              <div className="flex flex-col mt-10 text-sm">
                  <p>
                      <strong className="text-gray-700">Vai trò:</strong>
                      <span className="text-gray-700"> {user?.role || 'Đang cập nhật...'}</span>
                  </p>

                  <p className="self-start mt-3.5 text-center">
                      <strong className="text-gray-700">Lĩnh vực nghiên cứu:</strong>
                      <span className="text-gray-700"> Công nghệ vi mạch bán dẫn {/* Dữ liệu mẫu hoặc từ API khác */}</span>
                  </p>

                  <p className="mt-3.5">
                      <strong className="text-gray-700">Số dự án:</strong>
                      <span className="text-gray-700"> 08 {/* Dữ liệu mẫu hoặc từ API khác */}</span>
                  </p>

                  <p className="mt-3.5">
                      <strong className="text-gray-700">Link Github:</strong>
                       <span className="text-gray-700"> Chưa có {/* Dữ liệu mẫu hoặc từ API khác */}</span>
                  </p>
              </div>
          </section>
    </div>
  );
}; 