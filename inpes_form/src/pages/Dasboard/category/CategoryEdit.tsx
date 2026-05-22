import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3000/category/${id}`);
        const result = await res.json(); // simpan ke variabel 'result'
        
        if (res.ok) {
          setName(result.data.name); 
        }
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryDetail();
  }, [id]);

  // 2. Fungsi untuk mengirimkan perubahan data (Update via PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/category/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        navigate("/dashboard/category");
      } else {
        const err = await res.json();
        alert(err.message || "Gagal update");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <p className="p-6">Memuat data kategori...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Kategori</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-md space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Nama Kategori Baru</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-pink-400"
            placeholder="Ubah nama kategori..."
          />
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/category")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded transition w-1/2 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded transition w-1/2 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}