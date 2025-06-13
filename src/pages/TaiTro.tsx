import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@cnpm/components/TrangChuThanhVienNghienCuu/Sidebar";
import Header from "@cnpm/components/Header";
import { SearchInput } from "@cnpm/components/Tai Tro/SearchInput";
import { SponsorshipTable } from "@cnpm/components/Tai Tro/SponsorshipTable";

function TaiTroThanhVienNghienCuu() {
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <main className="bg-slate-50 min-h-screen w-full">
      <div className="flex min-h-screen flex-row">
        <aside className="w-[18%] border-r border-slate-200 bg-gray-50">
          <Sidebar />
        </aside>

        <section className="w-[82%] flex flex-col">
          <Header />

          <div className="flex flex-col mx-auto w-full pb-64">
            <h1 className="self-center mt-12 text-3xl font-bold text-gray-700">
              Yêu cầu tài trợ
            </h1>

            <div className="flex justify-between items-center mt-7 w-full max-w-[989px] mx-auto">
              <SearchInput />
              <button
                onClick={() => navigate("/phieuyeucautaitro")}
                className="flex items-center gap-2 px-5 py-3 text-base font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c624f3d174d140f745af36e9fec2135c9d3ae8fb"
                  className="w-5 h-5"
                  alt="Icon thêm yêu cầu"
                />
                <span>{"Tạo yêu cầu"}</span>
              </button>
            </div>

            <div className="mt-6 px-6 pt-6 pb-20 bg-white rounded-2xl shadow-sm max-w-[1158px] mx-auto">
              <div className="flex justify-between items-center px-3 pb-2.5">
                <h2 className="text-xl font-bold text-gray-700">
                  Danh sách yêu cầu tài trợ
                </h2>
                <button
                  onClick={toggleSortOrder}
                  className="px-4 py-2 bg-cyan-50 border rounded-full hover:bg-cyan-100 transition"
                >
                  <span className="text-sm text-gray-500">
                    Sắp xếp {sortOrder === "asc" ? "A → Z" : "Z → A"}
                  </span>
                </button>
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
