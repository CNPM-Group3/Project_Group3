// Enhanced debug version with comprehensive error tracking

"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { DocumentUpload } from "@cnpm/components/Du An/Thêm Tài Liệu/DocumentUpload";
import { uploadMultipleDocuments, createMultipleDocumentFormData } from "@cnpm/services/documentService";
import { useNavigate, useLocation } from "react-router-dom";

interface ThemTaiLieuNghienCuuChinhProps {
  userId?: string;
  onUploadSuccess?: (files: File[]) => void;
  onSubmit?: (files: File[]) => void;
}

interface LocationState {
  projectId?: number;
  projectTitle?: string;
}

function ThemTaiLieuNghienCuuChinh({
  userId,
  onUploadSuccess,
  onSubmit
}: ThemTaiLieuNghienCuuChinhProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  const projectId = state?.projectId;
  const projectTitle = state?.projectTitle;
  
  const [isUploading, setIsUploading] = React.useState(false);
  const [debugInfo, setDebugInfo] = React.useState<any[]>([]);

  // Debug logger function
  const addDebugLog = (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      message,
      data: data ? JSON.stringify(data, null, 2) : null
    };
    
    console.log(`[DEBUG ${timestamp}] ${message}`, data || '');
    setDebugInfo(prev => [...prev, logEntry]);
  };

  // Check authentication status
  React.useEffect(() => {
    addDebugLog("Component mounted, checking authentication and state", {
      userId,
      projectId,
      projectTitle,
      locationState: state,
      localStorage: {
        token: localStorage.getItem('token') ? 'EXISTS' : 'NOT_FOUND',
        authToken: localStorage.getItem('authToken') ? 'EXISTS' : 'NOT_FOUND',
        accessToken: localStorage.getItem('accessToken') ? 'EXISTS' : 'NOT_FOUND',
        user: localStorage.getItem('user') ? 'EXISTS' : 'NOT_FOUND'
      },
      cookies: document.cookie,
      headers: {
        authorization: document.cookie.includes('Authorization') ? 'FOUND_IN_COOKIES' : 'NOT_IN_COOKIES'
      }
    });
  }, [userId, projectId, projectTitle, state]);

  const handleSubmit = async (files: File[]) => {
    addDebugLog("Starting handleSubmit", {
      filesCount: files?.length,
      files: files?.map(f => ({ name: f.name, size: f.size, type: f.type })),
      projectId,
      userId
    });

    if (!files || files.length === 0) {
      addDebugLog("ERROR: No files selected");
      alert("Không có file nào được chọn");
      return;
    }

    if (!projectId) {
      addDebugLog("ERROR: No project ID");
      alert("Không có thông tin dự án");
      return;
    }

    setIsUploading(true);
    addDebugLog("Set uploading state to true");

    try {
      // Pre-upload authentication check
      addDebugLog("Checking authentication before upload", {
        localStorage: {
          token: localStorage.getItem('token') ? 'EXISTS' : 'NOT_FOUND',
          authToken: localStorage.getItem('authToken') ? 'EXISTS' : 'NOT_FOUND',
          accessToken: localStorage.getItem('accessToken') ? 'EXISTS' : 'NOT_FOUND'
        },
        cookies: document.cookie,
        userId: userId
      });

      // Create FormData using the helper function
      addDebugLog("Creating FormData");
      const formData = createMultipleDocumentFormData(
        files,
        [projectId], // ProjectIds array
        [], // ResearchTopicIds array (empty for project upload)
        "Tài liệu dự án" // DefaultCategory
      );

      // // Debug FormData contents
      // addDebugLog("FormData created, inspecting contents");
      // const formDataEntries: any = {};
      // for (let [key, value] of formData.entries()) {
      //   if (value instanceof File) {
      //     formDataEntries[key] = {
      //       type: 'File',
      //       name: value.name,
      //       size: value.size,
      //       type: value.type
      //     };
      //   } else {
      //     formDataEntries[key] = value;
      //   }
      // }
      // addDebugLog("FormData contents", formDataEntries);

      // Check network connectivity
      addDebugLog("Checking network connectivity");
      try {
        const connectivityCheck = await fetch('/api/health', { method: 'HEAD' });
        addDebugLog("Network connectivity check", {
          status: connectivityCheck.status,
          ok: connectivityCheck.ok
        });
      } catch (networkError) {
        addDebugLog("Network connectivity check failed", networkError);
      }

      addDebugLog("Calling uploadMultipleDocuments API");
      const response = await uploadMultipleDocuments(formData);
      
      addDebugLog("Upload API response received", {
        response,
        responseType: typeof response,
        responseKeys: response ? Object.keys(response) : null
      });

      // Handle successful upload - check for success status
      if (response && response.success !== false) {
        addDebugLog("Upload successful, calling success handlers");
        
        // Call success callback if provided
        if (onUploadSuccess) {
          onUploadSuccess(files);
        }
        
        // Navigate back to project detail page with success message
        const navigationState = {
          id: projectId, 
          title: projectTitle, 
          documentCreated: true,
          message: `${files.length} tài liệu đã được tải lên thành công!`,
          uploadedFiles: files.map(f => f.name)
        };
        
        addDebugLog("Navigating to project detail", navigationState);
        navigate(`/chitietduan/${projectId}`, { state: navigationState });
      } else {
        // Handle API error response
        const errorMessage = response?.message || response?.error || "Lỗi không xác định";
        addDebugLog("API returned error response", {
          response,
          errorMessage
        });
        alert("Tải lên thất bại: " + errorMessage);
      }
    } catch (error: any) {
      addDebugLog("Upload failed with exception", {
        error: error.message,
        errorName: error.name,
        errorCode: error.code,
        errorStack: error.stack,
        response: error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers,
          config: {
            url: error.response.config?.url,
            method: error.response.config?.method,
            headers: error.response.config?.headers,
            timeout: error.response.config?.timeout
          }
        } : null,
        request: error.request ? {
          readyState: error.request.readyState,
          status: error.request.status,
          statusText: error.request.statusText,
          responseURL: error.request.responseURL
        } : null
      });
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const errorData = error.response.data;
        
        addDebugLog("Server error response details", {
          status,
          statusText: error.response.statusText,
          data: errorData,
          headers: error.response.headers,
          url: error.response.config?.url,
          method: error.response.config?.method,
          requestHeaders: error.response.config?.headers
        });
        
        switch (status) {
          case 400:
            const badRequestMsg = errorData?.message || errorData?.error || "Dữ liệu không hợp lệ";
            addDebugLog("400 Bad Request error", { message: badRequestMsg, errorData });
            alert(`Dữ liệu không hợp lệ: ${badRequestMsg}`);
            break;
          case 401:
            addDebugLog("401 Unauthorized error - Authentication failed", {
              errorData,
              currentAuth: {
                localStorage: {
                  token: localStorage.getItem('token') ? 'EXISTS' : 'NOT_FOUND',
                  authToken: localStorage.getItem('authToken') ? 'EXISTS' : 'NOT_FOUND',
                  accessToken: localStorage.getItem('accessToken') ? 'EXISTS' : 'NOT_FOUND'
                },
                cookies: document.cookie,
                userId: userId
              }
            });
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            // Optionally redirect to login
            // navigate('/login');
            break;
          case 403:
            addDebugLog("403 Forbidden error", { errorData });
            alert("Bạn không có quyền tải lên tài liệu cho dự án này.");
            break;
          case 413:
            addDebugLog("413 Payload Too Large error", { errorData });
            alert("File quá lớn. Vui lòng chọn file nhỏ hơn.");
            break;
          case 415:
            addDebugLog("415 Unsupported Media Type error", { errorData });
            alert("Định dạng file không được hỗ trợ.");
            break;
          case 500:
            addDebugLog("500 Internal Server Error", { errorData });
            alert("Lỗi server nội bộ. Vui lòng thử lại sau.");
            break;
          default:
            const defaultMsg = errorData?.message || errorData?.error || `Lỗi server (${status})`;
            addDebugLog(`${status} Server Error`, { message: defaultMsg, errorData });
            alert(`Lỗi: ${defaultMsg}`);
        }
      } else if (error.request) {
        // Network error - no response received
        addDebugLog("Network error - no response received", {
          request: error.request,
          readyState: error.request?.readyState,
          status: error.request?.status,
          responseURL: error.request?.responseURL
        });
        alert("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet và thử lại.");
      } else if (error.code === 'ECONNABORTED') {
        // Timeout error
        addDebugLog("Timeout error", { error });
        alert("Quá thời gian chờ. File có thể quá lớn hoặc kết nối chậm.");
      } else {
        // Other error
        addDebugLog("Unknown error", { error });
        alert("Có lỗi xảy ra khi tải lên file: " + (error.message || "Lỗi không xác định"));
      }
    } finally {
      addDebugLog("Upload process completed, setting uploading state to false");
      setIsUploading(false);
    }
  };

  // If no project info, redirect back or show error
  React.useEffect(() => {
    if (!projectId) {
      addDebugLog("No project ID found, redirecting", { state });
      alert("Không có thông tin dự án. Vui lòng thử lại từ trang dự án.");
      navigate("/duan"); // Navigate back to projects list
    }
  }, [projectId, navigate, state]);

  if (!projectId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Không có thông tin dự án</h2>
          <p className="text-gray-500">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex min-h-screen w-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 h-full bg-white border-r border-gray-200 z-40">
          <Sidebar />
        </aside>

        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <div className="fixed top-0 left-64 right-0 h-16 z-30 bg-white border-b border-gray-200">
            <Header />
          </div>

          <section className="flex flex-col pb-60 w-full items-center mt-16">
            {/* Debug Panel - Remove this in production */}
            

            <DocumentUpload
              userId={userId}
              projectId={projectId}
              projectTitle={projectTitle}
              onUploadSuccess={onUploadSuccess}
              onSubmit={handleSubmit}
            />
            
            {/* Loading overlay */}
            {isUploading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                  <svg className="animate-spin h-8 w-8 text-teal-500 mb-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-lg font-medium text-gray-700">Đang tải lên tài liệu...</p>
                  <p className="text-sm text-gray-500 mt-1">Vui lòng không đóng trang này</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default ThemTaiLieuNghienCuuChinh;