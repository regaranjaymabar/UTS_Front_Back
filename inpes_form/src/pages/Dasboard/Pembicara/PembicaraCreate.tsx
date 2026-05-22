import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PembicaraCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState(""); // <-- Tambah state untuk Role
  const [foto, setFoto] = useState(""); // State untuk URL Foto
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/pembicara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Kirim ketiga data lengkap ke backend
        body: JSON.stringify({ 
          name,
          role: role || "Pembicara", // Beri nilai default jika kosong
          foto: foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" // Default avatar jika kosong
        }), 
      });

      if (res.ok) {
        alert("Pembicara berhasil ditambahkan!");
        navigate("/dashboard/pembicara");
      } else {
        const err = await res.json();
        alert(err.message || "Gagal menambahkan pembicara");
      }
    } catch (error) {
      console.error("Error saat menyimpan pembicara:", error);
      alert("Terjadi kesalahan koneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Tambah Pembicara
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* 1. Input Nama Pembicara */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Pembicara
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-900"
              placeholder="Masukkan nama pembicara baru..."
            />
          </div>

          {/* 2. Input Jabatan / Role Pembicara */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Jabatan / Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-900"
              placeholder="Contoh: UI/UX Designer, Pro Player AKM, Full-Stack Developer"
            />
          </div>

          {/* 3. Input URL Foto Pembicara */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              URL Foto Pembicara
            </label>
            <input
              type="url"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-gray-900"
              placeholder="Contoh: https://link-gambar.com/foto.jpg"
            />
            <p className="text-xs text-gray-400 mt-1">
              *Masukkan tautan/URL gambar langsung dari internet.
            </p>
          </div>

          {/* Aksi: Batal & Simpan */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/pembicara")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-lg transition cursor-pointer disabled:bg-pink-400 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};