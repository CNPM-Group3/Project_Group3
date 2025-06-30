// Fixed DocumentUpload component with multiple file support

"use client";
import * as React from "react";

interface DocumentUploadProps {
  userId?: string;
  projectId?: number;
  projectTitle?: string;
  onUploadSuccess?: (files: File[]) => void;
  onSubmit?: (files: File[]) => void;
}

// Helper function to format file size
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Simple function to guess file type description from extension
const getFileTypeDescription = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return 'PDF Document';
    case 'doc':
    case 'docx': return 'Microsoft Word Document';
    case 'xls':
    case 'xlsx': return 'Microsoft Excel Spreadsheet';
    case 'txt': return 'Text Document';
    case 'ppt':
    case 'pptx': return 'Microsoft PowerPoint Presentation';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif': return 'Image File';
    default: return 'File';
  }
};

// File Icon Components (SVG)
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
    <path d="M14.5 2.25a.75.75 0 00-1.06 0L9 6.69l-1.97-1.97a.75.75 0 00-1.06 0l-3.5 3.5a.75.75 0 000 1.06l3.5 3.5a.75.75 0 001.06 0L9 10.31l1.97 1.97a.75.75 0 001.06 0l3.5-3.5a.75.75 0 000-1.06l-3.5-3.5z" />
    <path fillRule="evenodd" d="M4.25 5.75a.75.75 0 00-1.5 0v9.5c0 1.657 1.343 3 3 3h9.5a.75.75 0 000-1.5h-9.5a1.5 1.5 0 01-1.5-1.5v-9.5z" clipRule="evenodd" />
  </svg>
);

const WordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
    <path d="M18 21H6a3 3 0 01-3-3V6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3zM7.772 7.803a.75.75 0 01.148.85l-1.75 3.5a.75.75 0 01-1.33.043L3.2 10.5l1.25-2.5a.75.75 0 011.34-.026l.92.92.92-.92a.75.75 0 01.85-.148z" />
  </svg>
);

const ExcelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600">
    <path fillRule="evenodd" d="M18 21H6a3 3 0 01-3-3V6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3zM8.761 7.864a.75.75 0 011.07-.082l2.25 1.875a.75.75 0 010 1.114l-2.25 1.875a.75.75 0 11-.988-1.184l.846-.705-.846-.705a.75.75 0 01-.082-1.07z" clipRule="evenodd" />
  </svg>
);

const TextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-600">
    <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a2 2 0 00-1.147-1.836L12 2.147 2.647 7.164A2 2 0 001.5 9v9a3 3 0 003 3h15zM12 9a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0112 9zm-1.5 8.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
  </svg>
);

const GenericFileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-400">
    <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a2 2 0 00-1.147-1.836L12 2.147 2.647 7.164A2 2 0 001.5 9v9a3 3 0 003 3h15zm-6-10.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm.75 7.5a.75.75 0 01-.75.75h-3a.75.75 0 010-1.5h3c.414 0 .75.336.75.75z" clipRule="evenodd" />
  </svg>
);

// Loading spinner component
const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  userId, 
  projectId, 
  projectTitle, 
  onUploadSuccess, 
  onSubmit 
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [uploadError, setUploadError] = React.useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (selectedFiles.length > 0) {
      const validationError = validateFiles(selectedFiles);
      if (validationError) {
        setUploadError(validationError);
        return;
      }
    }
    
    setFiles(selectedFiles);
    setUploadError(""); // Clear any previous errors
  };

  const handleButtonClick = async () => {
    if (files.length === 0) {
      setUploadError("Vui lòng chọn ít nhất một file để tải lên");
      return;
    }

    if (!projectId) {
      setUploadError("Không có thông tin dự án");
      return;
    }

    if (onSubmit) {
      setIsUploading(true);
      try {
        await onSubmit(files);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleEdit = () => {
    setFiles([]);
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
    setUploadError("");
  };

  // Function to render appropriate file icon
  const renderFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <PdfIcon />;
      case 'doc':
      case 'docx':
        return <WordIcon />;
      case 'xls':
      case 'xlsx':
        return <ExcelIcon />;
      case 'txt':
        return <TextIcon />;
      default:
        return <GenericFileIcon />;
    }
  };

  // File size validation (e.g., max 50MB per file)
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const MAX_TOTAL_FILES = 10; // Maximum number of files

  const validateFiles = (filesToValidate: File[]) => {
    if (filesToValidate.length > MAX_TOTAL_FILES) {
      return `Chỉ được chọn tối đa ${MAX_TOTAL_FILES} file.`;
    }

    for (const file of filesToValidate) {
      if (file.size > MAX_FILE_SIZE) {
        return `File "${file.name}" quá lớn. Vui lòng chọn file nhỏ hơn 50MB.`;
      }
      
      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.ppt', '.pptx'];
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(ext)) {
        return `Định dạng file "${file.name}" không được hỗ trợ. Vui lòng chọn file: PDF, DOC, DOCX, XLS, XLSX, TXT, PPT, PPTX`;
      }
    }
    
    return null;
  };

  const getTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  return (
    <section className="flex flex-col items-center mt-12 w-full max-md:mt-16">
      <h1 className="text-3xl font-bold text-gray-700">Thêm tài liệu dự án</h1>
      
      {/* Project info display */}
      {projectTitle && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          Dự án: <strong>{projectTitle}</strong>
        </div>
      )}

      <div className="flex flex-col items-center w-full max-w-[1032px] mx-auto">
        <label className={`flex flex-col justify-center items-center py-20 mt-16 w-full text-sm text-center text-gray-500 bg-white rounded-lg border-2 border-dashed max-w-[1032px] min-h-[321px] max-md:px-5 max-md:py-24 max-md:mt-10 max-md:max-w-full cursor-pointer transition-colors ${
          isUploading ? 'border-gray-200 cursor-not-allowed' : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50'
        }`}>
          {files.length === 0 ? (
            <div className="flex flex-col w-full items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a658af8e68caa2f693e8c8472dd5304185720521?placeholderIfAbsent=true&apiKey=7efb82fbb853426aa9e7996914614d36"
                className="object-contain self-center aspect-[1.27] w-[38px]"
                alt="Upload icon"
              />
              <p className="py-1 mt-2 bg-black bg-opacity-0 max-md:px-2">
                Tải file hoặc kéo thả file vào đây
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Hỗ trợ: PDF, DOC, DOCX, XLS, XLSX, TXT, PPT, PPTX (Tối đa 50MB mỗi file, tối đa 10 file)
              </p>
            </div>
          ) : (
            <div className="w-full px-8 py-4 space-y-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {files.length} file đã chọn ({formatBytes(getTotalSize())})
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEdit();
                  }}
                  disabled={isUploading}
                  className="px-4 py-2 text-sm font-medium text-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Chọn lại file
                </button>
              </div>
              
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {renderFileIcon(file.name)}
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-gray-800">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        {getFileTypeDescription(file.name)} • {formatBytes(file.size)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    disabled={isUploading}
                    className="px-2 py-1 text-xs font-medium text-red-600 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            type="file"
            className="sr-only"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isUploading}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.ppt,.pptx"
            multiple
          />
        </label>

        {/* Error message */}
        {uploadError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {uploadError}
          </div>
        )}

        {/* Success message */}
        {files.length > 0 && !uploadError && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {files.length} file đã được chọn. Nhấn "Thêm" để tải lên.
          </div>
        )}
        
        <button
          className={`px-16 py-4 mt-9 max-w-full text-2xl font-bold text-center text-white whitespace-nowrap rounded-lg border-0 w-[300px] max-md:px-5 transition-all duration-200 ${
            isUploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : files.length > 0
                ? 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700' 
                : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handleButtonClick}
          disabled={files.length === 0 || isUploading}
        >
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner />
              Đang tải lên...
            </div>
          ) : (
            `Thêm ${files.length > 0 ? `(${files.length} file)` : ''}`
          )}
        </button>
      </div>
    </section>
  );
};