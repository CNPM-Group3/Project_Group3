"use client";
import * as React from "react";

interface DocumentUploadProps {
  userId?: string;
  onUploadSuccess?: (file: File) => void;
  onSubmit?: (file: File | null) => void; 
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
    // Add more cases for other file types as needed
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
    <path d="M18 21H6a3 3 0 01-3-3V6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3zM7.772 7.803a.75.75 0 01.148.85l-1.75 3.5a.75.75 0 01-1.33.043L3.2 10.5l1.25-2.5a.75.75 0 011.34-.026l.92.92.92-.92a.75.75 0 01.85-.148zM16.498 7.75c-.222 0-.444.038-.648.106-.205.07-.393.165-.56.28a1.833 1.833 0 00-.477.374c-.14.14-.262.293-.366.46-.103.167-.178.35-.225.547-.048.198-.072.401-.072.61v.35c0 .414.16.813.47 1.102.308.29.71.455 1.13.455.42 0 .822-.165 1.13-.456.31-.289.47-.688.47-1.102v-.35c0-.208-.024-.411-.072-.609-.047-.197-.122-.38-.225-.547-.104-.167-.226-.32-.366-.46a1.833 1.833 0 00-.477-.374c-.167-.115-.355-.21-.56-.28-.204-.068-.426-.106-.648-.106zm-2.156 4.5a.75.75 0 01-.75.75h-2.948a.75.75 0 010-1.5h.948v-1.5H12a.75.75 0 010-1.5h-.75v-1.5a.75.75 0 011.5 0v1.5h.75a.75.75 0 010 1.5h-.75v1.5h.948a.75.75 0 01.75.75zm-.642 4.5a.75.75 0 01-.75.75h-2.16a.75.75 0 010-1.5h.91c.385 0 .75-.365.75-.75v-1.25h.5a.75.75 0 01.75.75v2.5c0 .414-.336.75-.75.75zM18.455 16a.75.75 0 01-.75.75h-2.16a.75.75 0 010-1.5h.91c.385 0 .75-.365.75-.75v-1.25h.5a.75.75 0 01.75.75v2.5c0 .414-.336.75-.75.75z" />
  </svg>
);

const ExcelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600">
    <path fillRule="evenodd" d="M18 21H6a3 3 0 01-3-3V6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3zM8.761 7.864a.75.75 0 011.07-.082l2.25 1.875a.75.75 0 010 1.114l-2.25 1.875a.75.75 0 11-.988-1.184l.846-.705-.846-.705a.75.75 0 01-.082-1.07zM15.75 9.75a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75z" clipRule="evenodd" />
    <path d="M12.145 15.75l-2.59-2.158a.75.75 0 010-1.184L12.145 10.25a.75.75 0 01.988 1.184l-1.627 1.356 1.627 1.356a.75.75 0 01-.988 1.184z" />
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

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ userId, onUploadSuccess, onSubmit }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
    if (selectedFile && onUploadSuccess) {
      onUploadSuccess(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(file);
    }
  };

  const handleEdit = () => {
    setFile(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Function to render appropriate file icon
  const renderFileIcon = () => {
    if (!file) return null;
    const ext = file.name.split('.').pop()?.toLowerCase();
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

  return (
    <section className="flex flex-col items-center mt-12 w-full max-md:mt-16">
      <h1 className="text-3xl font-bold text-gray-700">Thêm tài liệu dự án</h1>

      <div className="flex flex-col items-center w-full max-w-[1032px] mx-auto">
        <label className="flex flex-col justify-center items-center py-20 mt-16 w-full text-sm text-center text-gray-500 bg-white rounded-lg border-2 border-gray-300 border-dashed max-w-[1032px] min-h-[321px] max-md:px-5 max-md:py-24 max-md:mt-10 max-md:max-w-full cursor-pointer">
          {!fileName ? (
            <div className="flex flex-col w-full items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a658af8e68caa2f693e8c8472dd5304185720521?placeholderIfAbsent=true&apiKey=7efb82fbb853426aa9e7996914614d36"
                className="object-contain self-center aspect-[1.27] w-[38px]"
                alt="Upload icon"
              />
              <p className="py-1 mt-2 bg-black bg-opacity-0 max-md:px-2">
                Tải file{" "}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full px-8 py-4 bg-white rounded-lg">
              <div className="flex items-center gap-4">
                {renderFileIcon()}
                <div className="flex flex-col items-start">
                  <span className="text-base font-medium text-gray-800">{fileName}</span>
                  <span className="text-sm text-gray-500">{file ? getFileTypeDescription(file.name) : ''}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {file && <span className="text-sm text-gray-600">{formatBytes(file.size)}</span>}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEdit();
                  }}
                  className="px-3 py-1 text-sm font-medium text-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sửa
                </button>
              </div>
            </div>
          )}
          <input
            type="file"
            className="sr-only"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>

        <button
          className="px-16 py-4 mt-9 max-w-full text-2xl font-bold text-center text-white whitespace-nowrap bg-teal-500 rounded-lg border-0 border border-solid w-[300px] max-md:px-5"
          onClick={handleSubmit}
        >
          Thêm
        </button>
      </div>
    </section>
  );
};