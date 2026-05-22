import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:3000/category");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    }
    fetchCategories();
  }, []);

  function handleDelete(id: number) {
    if (confirm("Apakah kamu yakin ingin menghapus kategori ini?")) {
      fetch(`http://localhost:3000/category/${id}`, { method: "DELETE" })
        .then(() => {
          setCategories((prev) => prev.filter((cat) => cat.id !== id));
          alert("Data berhasil dihapus!");
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    // PENTING: h-full dan overflow-hidden di sini mengunci agar tidak merusak layout dashboard
    <div className="h-full flex flex-col w-full p-6 text-left overflow-hidden">
      
      {/* 1. Header Tetap (Tidak akan ikut scroll) */}
      <div className="flex-none flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Kategori</h1>
          <p className="text-sm text-gray-500">Kelola semua kategori event Infovest di sini</p>
        </div>
        <Link 
          to="/dashboard/category/create" 
          className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl py-2.5 px-5 font-semibold text-sm transition-all"
        >
          + Tambah Kategori
        </Link>
      </div>

      {/* 2. Tabel (Scrollable area) */}
      {/* overflow-y-auto di sini membuat tabel saja yang scroll, sidebar/logout di atas tetap diam */}
      <div className="flex-1 overflow-y-auto pr-2 pb-6">
          {categories.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500">Belum ada data kategori</p>
        </div>
            ) : (
            <div className="flex flex-col gap-4">
              {categories.map((cat, index) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col lg:flex-row lg:items-center gap-6 hover:shadow-md transition duration-300 w-full">
                  <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                    <span className="text-pink-600 font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="flex gap-2 w-full lg:w-auto shrink-0 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
                    <Link
                      to={`/dashboard/category/editcategory/${cat.id}`}
                      className="flex-1 lg:flex-none text-center bg-amber-50 text-amber-700 hover:bg-amber-100 px-5 py-2.5 rounded-xl text-sm font-semibold transition">Edit</Link>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="flex-1 lg:flex-none bg-red-50 text-red-700 hover:bg-red-100 px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer">Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
}