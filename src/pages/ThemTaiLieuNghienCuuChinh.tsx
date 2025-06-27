"use client";
import * as React from "react";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { DocumentUpload } from "@cnpm/components/Du An/Thêm Tài Liệu/DocumentUpload";

interface ThemTaiLieuNghienCuuChinhProps {
  userId?: string;
  onUploadSuccess?: (file: File) => void;
  onSubmit?: (file: File | null) => void;
}

function ThemTaiLieuNghienCuuChinh({
  userId,
  onUploadSuccess,
  onSubmit
}: ThemTaiLieuNghienCuuChinhProps) {
  return (
    <main className="bg-slate-50 min-h-screen w-full">
			<div className="flex flex-row min-h-screen">
				{/* Sidebar */}
				<div className="w-64 border-r border-slate-200 bg-gray fixed h-full">
					<Sidebar />
				</div>
				{/* Main content */}
				<div className="flex-1 flex flex-col ml-64">
					<div className="fixed w-full z-10">
						<Header />S
          </div>
      </div>

        {/* Content Section: simply contains DocumentUpload */}
        <section className="flex flex-col pb-60 w-full items-center"> {/* Added items-center back to center DocumentUpload within this section */}
           <DocumentUpload 
              userId={userId}
              onUploadSuccess={onUploadSuccess}
              onSubmit={onSubmit}
            />
        </section>
      </div>
    </main>
  );
}

export default ThemTaiLieuNghienCuuChinh;