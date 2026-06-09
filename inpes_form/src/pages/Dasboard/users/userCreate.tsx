import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://uts-front-back.vercel.app/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name,
          email,
          password,
          foto: foto || "   "
        }), 
      });

      if (res.ok) {
        alert("User berhasil ditambahkan!");
        navigate("/dashboard/user");
      } else {
        const err = await res.json();
        alert(err.message || "Gagal menambahkan user");
      }
    } catch (error) {
      console.error("Error saat menyimpan data user:", error);
      alert("Terjadi kesalahan koneksi ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Tambah Akun User
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* 1. Input Nama Lengkap */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
              placeholder="Masukkan nama lengkap user..."
            />
          </div>

          {/* 2. Input Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Alamat Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
              placeholder="contoh@domain.com"
            />
          </div>

          {/* 3. Input Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Password Akun
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
              placeholder="Masukkan password rahasia..."
            />
          </div>

          {/* 4. Input URL Foto Profil */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              URL Foto Profil (Opsional)
            </label>
            <input
              type="url"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
              placeholder="Contoh: https://link-gambar.com/foto.jpg"
            />
            <p className="text-xs text-gray-400 mt-1">
              *Masukkan tautan/URL gambar langsung dari internet. Jika dikosongkan, sistem memakai avatar default.
            </p>
          </div>

          {/* Aksi Bar: Batal & Simpan */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/user")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition cursor-pointer disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}