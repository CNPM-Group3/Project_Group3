import * as React from "react";
import Sidebar from "@cnpm/components/Tài Trợ/Sidebar";
import Header from "@cnpm/components/Header";
import { SearchInput } from "@cnpm/components/Tài Trợ/SearchInput";
import { SponsorshipTable } from "@cnpm/components/Tài Trợ/SponsorshipTable";

function TaiTroThanhVienNghienCuu() {
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [showForm, setShowForm] = React.useState(false);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: xử lý submit dữ liệu
    alert("Đã gửi yêu cầu tài trợ (giả lập)");
    setShowForm(false); // ẩn form sau khi gửi
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex min-h-screen flex-row">
        {/* Sidebar */}
        <aside className="w-[18%] border-r border-slate-200 bg-gray-50">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <section className="w-[82%] flex flex-col">
          <Header />

          <div className="flex flex-col mx-auto w-full pb-64 max-md:pb-24 max-md:max-w-full">
            <h1 className="self-center mt-12 text-3xl font-bold text-gray-700 max-md:mt-10">
              Yêu cầu tài trợ
            </h1>

            {/* Search Input + Create Button */}
            <div className="flex flex-wrap items-center justify-between gap-5 self-center mt-7 w-full max-w-[989px] max-md:max-w-full">
              <div className="mt-2">
                <SearchInput />
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-3 text-base font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c624f3d174d140f745af36e9fec2135c9d3ae8fb?placeholderIfAbsent=true&apiKey=348dfa5857644c228c3e6010a2ab82ee"
                  className="w-5 h-5 object-contain"
                  alt="Icon thêm yêu cầu"
                />
                <span>{"Tạo yêu cầu"}</span>
              </button>
            </div>

            {/* Content Box */}
            <div className="mt-6 px-6 pt-6 pb-20 mx-3.5 bg-white rounded-2xl shadow-sm w-full max-w-[1158px] min-h-[511px] max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
              <div className="px-3 pb-2.5 w-full min-h-12 max-md:max-w-full">
                <div className="flex flex-wrap items-center justify-between gap-10 w-full max-md:max-w-full">
                  <h2 className="text-xl font-bold text-gray-700">
                    Danh sách yêu cầu tài trợ
                  </h2>
                  <button
                    onClick={toggleSortOrder}
                    className="flex items-center px-4 py-2 bg-cyan-50 border border-white rounded-full hover:bg-cyan-100 transition"
                  >
                    <span className="text-sm text-gray-500">
                      Sắp xếp {sortOrder === "asc" ? "A → Z" : "Z → A"}
                    </span>
                  </button>
                </div>
              </div>

              <SponsorshipTable sortOrder={sortOrder} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TaiTroThanhVienNghienCuu;